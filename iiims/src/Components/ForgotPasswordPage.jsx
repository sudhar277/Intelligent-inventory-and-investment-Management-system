
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Simulate sending OTP API call (replace with actual implementation)
  const sendOtp = async () => {
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsOtpSent(true);
        console.log('OTP sent successfully!');
      } else {
        console.error('Error sending OTP:', response.statusText);
        alert('Error sending OTP. Please try again.'); // Handle errors gracefully
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An unexpected error occurred. Please try again.'); // Handle network or other errors
    }
  };

  // Simulate verifying OTP API call (replace with actual implementation)
  const verifyOtp = useCallback(async () => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      });
  
      if (response.ok) {
        setIsOtpVerified(true);
        console.log('OTP verified successfully!');
      } else {
        console.error('Error verifying OTP:', response.statusText);
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An unexpected error occurred. Please try again.'); // Handle network or other errors
    }
  }, [email, otp, setIsOtpVerified]); // Include dependencies in the dependency array
  
  // Simulate resetting password API call (replace with actual implementation)
  const resetPassword = async () => {
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        console.log('Password reset successfully!');
        // Redirect to login page or show success message
      } else {
        console.error('Error resetting password:', response.statusText);
        alert('Error resetting password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An unexpected error occurred. Please try again.'); // Handle network or other errors
    }
  };

  useEffect(() => {
    if (isOtpSent && otp.length === 6) {
      verifyOtp(); // Verify OTP automatically when entered
    }
  }, [isOtpSent, otp, verifyOtp]);
  const handleSendOtp = (e) => {
    e.preventDefault();
    sendOtp();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    verifyOtp();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#4504f6', backgroundImage: 'linear-gradient(to right, #a8c0ff, #3f2b96)' }}>
      <Card style={{
        width: '350px', // Adjust card width as needed
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.15)', // Glossmorphism shadow
        backdropFilter: 'blur(4px)', // Glossmorphism effect
        backgroundColor: 'rgba(255, 255, 255, 0.85)' // Semi-transparent background
      }}>
        <Card.Body>
          <h2>Forgot Password</h2>
<p>Enter your email address to reset your password.</p>
{!isOtpSent && !isOtpVerified && (
  <Form onSubmit={handleSendOtp}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <InputGroup>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </InputGroup>
    </Form.Group>
    <Button variant="primary" type="submit">
      Send OTP
    </Button>
  </Form>
)}

{isOtpSent && !isOtpVerified && (
  <Form onSubmit={handleVerifyOtp}>
    <Form.Group controlId="formBasicOtp">
      <Form.Label>Enter OTP</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />
      </InputGroup>
    </Form.Group>
    <Button variant="primary" type="submit">
      Verify OTP
    </Button>
  </Form>
)}

{isOtpVerified && (
  <Form onSubmit={handleResetPassword}>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>New Password</Form.Label>
      <InputGroup>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </InputGroup>
    </Form.Group>
    <Button variant="primary" type="submit">
      Reset Password
    </Button>
  </Form>
)}

<div className="mt-3">
  <Link to="/login">Remembered your password? Log in</Link>
</div>
</Card.Body>
</Card>
</div>
);
};

export default ForgotPasswordPage;
