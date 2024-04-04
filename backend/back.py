import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from fastapi.middleware.cors import CORSMiddleware
from passlib.hash import bcrypt  # For password hashing
import string
import random
from datetime import datetime, timedelta
from email.mime.text import MIMEText
import os
from twilio.rest import Client


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
            raise HTTPException(status_code=401, detail="Register first to login")
        
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


# Twilio setup
account_sid = "AC1b687701d93e25abe603b017945033f5"
auth_token = "790c72c3342dd3920105c00a1f05b22b"
verify_sid = "VA7830a33eafb91315e6561bd0a43c1ab1"
client = Client(account_sid, auth_token)

class PhoneNumberInput(BaseModel):
    phone_number: str

@app.post("/send_otp")
async def send_otp(data: PhoneNumberInput):
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    # Check if the user is registered
    cur.execute(
        """
        SELECT "Contact_Info" FROM "User" WHERE "Contact_Info" = %s
        """,
        (data.phone_number,)
    )
    result = cur.fetchone()
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Send the OTP
    verification = client.verify.v2.services(verify_sid) \
        .verifications \
        .create(to=data.phone_number, channel="sms")

    return {"status": "success"}

class OtpInput(BaseModel):
    phone_number: str
    otp_code: str

@app.post("/verify_otp")
async def verify_otp(data: OtpInput):
    # Verify the OTP
    verification_check = client.verify.v2.services(verify_sid) \
        .verification_checks \
        .create(to=data.phone_number, code=data.otp_code)
    if verification_check.status != "approved":
        raise HTTPException(status_code=400, detail="Invalid OTP")

    return {"status": "success"}

class ResetPasswordInput(BaseModel):
    phone_number: str
    new_password: str

@app.post("/reset_password")
async def reset_password(data: ResetPasswordInput):
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    # Reset the password
    hashed_password = bcrypt.hash(data.new_password)
    cur.execute(
        """
        UPDATE "User" SET "Password_Hash" = %s WHERE "Contact_Info" = %s
        """,
        (hashed_password, data.phone_number)
    )
    conn.commit()

    return {"status": "success"}
