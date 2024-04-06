from fastapi import FastAPI, BackgroundTasks
import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv
load_dotenv('.env')

app = FastAPI()

class Envs:
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_FROM = os.getenv('MAIL_FROM')

def send_email(subject, message, from_addr, to_addr, password):
    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = from_addr
    msg['To'] = to_addr

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(from_addr, password)
    server.send_message(msg)
    server.quit()

@app.post('/send-mail/')
async def send_mail(background_tasks: BackgroundTasks, email: str):
    subject = "Hello"
    message = "This is a test email sent from Python."
    from_addr = Envs.MAIL_FROM
    password = Envs.MAIL_PASSWORD

    background_tasks.add_task(send_email, subject, message, from_addr, email, password)
    return {"message": "email has been sent"}
