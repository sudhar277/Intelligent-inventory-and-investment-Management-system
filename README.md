# Intelligent Inventory and Investment Management

## Overview

This project is an Intelligent Inventory and Investment Management system designed to streamline and optimize inventory and supply chain processes. The system features a dashboard tailored for three key roles: Warehouse Manager, Production Manager, and Logistics Manager. Each role has specific functionalities and user stories that guide their interactions with the system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [User Roles and Functionalities](#user-roles-and-functionalities)
    - [Warehouse Manager](#warehouse-manager)
    - [Production Manager](#production-manager)
    - [Logistics Manager](#logistics-manager)
- [Tech Stack](#tech-stack)
- [Installation and Running Instructions](#installation-and-running-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Accessing the Application](#accessing-the-application)
- [Sending OTP through Email](#sending-otp-through-email)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Roles and Functionalities

#### Warehouse Manager
- **Real-time Inventory Tracking**
  - Add and update inventory levels in real-time.
  - Methods include barcode scanning and manual entry.
  - Track inventory location and history with timestamps.

#### Production Manager
- **Inventory Reorder Management**
  - Set reorder points for raw materials based on predicted demand.
  - Automatic reorder notifications when inventory levels fall below reorder points.
  - Adjust reorder points based on demand patterns.

#### Logistics Manager
- **Supply Chain Tracking**
  - Track the movement of inventory using RFID or GPS technology.
  - Real-time updates on shipment status and location.
  - Alerts for potential delays or disruptions.

## Tech Stack

- **Frontend**: Vite React
- **Backend**: FastAPI (hosted on Render)
- **Database**: PostgreSQL (hosted on Render)


## Installation and Running Instructions

### Prerequisites
- Node.js and npm (for React frontend)
- Python 3.8 or higher
- PostgreSQL database
- SMTP server credentials (for sending OTP)

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Set up a virtual environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install fastapi uvicorn psycopg2-binary email-validator passlib[bcrypt] python-dotenv
   ```

4. **Set up environment variables**:
   Create a `.env` file in the backend directory and add the following:
   ```
   DATABASE_URL=your_postgres_connection_string
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_username
   SMTP_PASSWORD=your_smtp_password
   TWILIO_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ```

5. **Initialize the database**:
   Ensure your PostgreSQL server is running and execute the SQL scripts located in the `database` folder to set up the schema and initial data.

6. **Run the FastAPI server**:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the React application**:
   ```bash
   npm run dev
   ```

### Accessing the Application
Open your web browser and navigate to `http://localhost:3000` to view the React frontend. The FastAPI backend will be available at `http://localhost:8000`.

## Sending OTP through Email

The system uses the Twilio SendGrid service to send OTPs via email for password resets. The SMTP server settings are configured in the environment variables, and the email sending functionality is implemented using Python's `smtplib`.

Here is a snippet from the backend code that handles sending OTP:

```python
from email.mime.text import MIMEText
import smtplib

def send_email(receiver_email, subject, body):
    message = MIMEText(body)
    message['From'] = SMTP_USER
    message['To'] = receiver_email
    message['Subject'] = subject

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, receiver_email, message.as_string())
```

This function is called when the OTP needs to be sent, constructing the email and using the SMTP server credentials to authenticate and send the email.

## Usage Guide

### 1. Click on Login
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/51bc79f0-3e79-4ffa-8e4d-c55e9274810a/90ef5301-c3dc-40a9-aac3-c5ad8fc7c57b.png" alt="Step 1 screenshot" width="600">

### 2. Click on Sign up
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/9f834b67-e2c0-4a7e-b2fc-8d087205d001/9b7d1c6b-45c3-4d32-b028-c4639a5f05ef.png" alt="Step 2 screenshot" width="600">

### 3. Email
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/24abacb4-f042-4f4a-b984-7dae4442eae9/364c30e6-271a-437c-8db6-88c30af2203f.png" alt="Step 3 screenshot" width="600">

### 4. Enter OTP
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/bb9cfdb7-2f9e-440d-956f-70c68cbe09bc/dc1f1713-1b8a-455a-9a0c-95642fee14cc.png" alt="Step 4 screenshot" width="600">

### 5. Password field
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/84b837e6-d829-4c58-b8e5-ee795d9b4abf/a5918e17-105f-4a4d-b16b-cdf2daf22f91.png" alt="Step 5 screenshot" width="600">

### 6. Role1: Warehouse Manager Page
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/8f53f3c9-a76d-4762-9274-fc83ceb86364/64f60c2c-b5f3-4d90-98b9-7ce2775f50d1.png" alt="Step 6 screenshot" width="600">

### 7. Click on View History
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/7eb74125-3eae-41e8-89e3-085ffc87ec2b/d583528d-e3c9-4da3-9778-6a67b5356d2d.png" alt="Step 7 screenshot" width="600">

### 8. Click on View Inventory
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/2a47846e-e7a4-4f3b-b75b-a1b07f419c5d/cc844a3c-38cb-4163-9aa9-1a9c78e66c93.png" alt="Step 8 screenshot" width="600">

### 9. Role 2: Production Manager
<img src="https://images.tango.us/workflows/27a92475-e338-44b6-98bf-d13a86617e2b/steps/2108d418-e13d-42a2-8561-771f2183a809/a18e53b6-e28b-46a9-8799-745f02594b37.jpeg" alt="Step 9 screenshot" width="600">

### 10. Role 3: Logistics Manager
<img src="https://images.tango.us/workflows

/27a92475-e338-44b6-98bf-d13a86617e2b/steps/e2dadef6-86c5-4b17-8587-74a2440e74bd/0dbd5dd9-1f38-49a7-bb3e-20857732c1b0.png" alt="Step 10 screenshot" width="600">

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out for any questions or support regarding this project. Happy coding!
