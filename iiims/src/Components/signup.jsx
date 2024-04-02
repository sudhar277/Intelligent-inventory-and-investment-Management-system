import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import signupimage from '../Signuphalf.png';
import { registerUser } from './apiservice'; // Import the registerUser function

const SignupPage = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    termsCheckbox: false,
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { id, value, checked, type } = event.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.termsCheckbox) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      // Construct the payload
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phoneNumber,
      };
      // Call the registerUser function from your apiService
      const response = await registerUser(payload);
      // Handle the response here
      if (response) {
        console.log(response);
        alert('Registration successful!');
      } else {
        alert('Registration failed.');
      }
    } else {
      // Handle the case where terms are not accepted
      alert('Please accept the Terms of Service to proceed.');
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Left half with image */}
        <Col md={6}>
          <img
            src={signupimage}
            alt="Illustration"
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>

        {/* Right half with signup form */}
        <Col md={6} style={{
          backgroundImage: 'linear-gradient(109.6deg, rgba(156, 252, 248, 1) 11.2%, rgba(110, 123, 251, 1) 91.1%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Card style={{
            width: '80%',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
            borderRadius: '15px',
          }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <Form.Group controlId="fullName">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="termsCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the Terms of Service"
                    checked={formData.termsCheckbox}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Join now
                </Button>

                <p className="mt-3">
                  Already a member? <Link to="/">Log In</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
