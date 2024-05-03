import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { sendOtp, verifyOtp, resetPassword } from './apiservice';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate(); 

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const response = await sendOtp(email);
    if (response.status === 'success') {
      setIsOtpSent(true);
      console.log('OTP sent successfully!');
    } else {
      console.error('Error sending OTP:', response.detail);
      alert('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const response = await verifyOtp(email, otp);
    if (response.status === 'success') {
      setIsOtpVerified(true);
      console.log('OTP verified successfully!');
    } else {
      console.error('Error verifying OTP:', response.detail);
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await resetPassword(email, newPassword);
    if (response.status === 'success') {
      console.log('Password reset successfully!');
      alert('Password reset successfully!');
      navigate('/');
    } else {
      console.error('Error resetting password:', response.detail);
      alert('Error resetting password. Please try again.');
    }
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
<div>
<p>Enter your email address to reset your password.</p>
</div>
{!isOtpSent && !isOtpVerified && (
  <Form onSubmit={handleSendOtp}>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
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
          minLength={8}
        />
      </InputGroup>
    </Form.Group>
    <Button variant="primary" type="submit">
      Reset Password
    </Button>
  </Form>
)}

<div className="mt-3">
  <Link to="/">Remembered your password? Log in</Link>
</div>
</Card.Body>
</Card>
</div>
);
};


export default  ForgotPasswordPage;
