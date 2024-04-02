import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from passlib.hash import bcrypt  # For password hashing

logger = logging.getLogger("uvicorn")
app = FastAPI()

DATABASE_URL = "dbname=inventory_wxrq user=inventory_wxrq_user password=32T4vxi3Pe4E703IDoJFRLjLDPnVjaQ6 host=dpg-co2n9f021fec73b0s4g0-a.oregon-postgres.render.com port=5432"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegistration(BaseModel):
    name: str
    email: str
    password: str
    phone_number: str

@app.post("/register")
async def register_user(user_data: UserRegistration):
    logger.info(f"Received user data: {user_data.json()}")
    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        hashed_password = bcrypt.hash(user_data.password)
        now = datetime.now()
        cur.execute(
            """
            INSERT INTO "User" ("Name", "Email", "Password_Hash", "Contact_Info", "datetime")
            VALUES (%s, %s, %s, %s, %s)
            """,
            (user_data.name, user_data.email, hashed_password, user_data.phone_number, now)
        )
        conn.commit()
        return {"status": "success"}
    except (Exception, psycopg2.Error) as error:
        print(f"Error registering user: {error}")
        return {"status": "error", "detail": str(error)}
    finally:
        if conn:
            cur.close()
            conn.close()

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/login")
async def login_user(user_data: UserLogin):
    logger.info(f"Received login data: {user_data.json()}")
    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute(
            """
            SELECT "Password_Hash" FROM "User" WHERE "Email" = %s
            """,
            (user_data.email,)
        )
        result = cur.fetchone()
        if result is None:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        hashed_password = result[0]
        if not bcrypt.verify(user_data.password, hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        return {"status": "success"}
    except (Exception, psycopg2.Error) as error:
        print(f"Error logging in user: {error}")
        return {"status": "error", "detail": str(error)}
    finally:
        if conn:
            cur.close()
            conn.close()
