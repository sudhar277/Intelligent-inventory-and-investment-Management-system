import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import signupimage from './Signuphalf.png';

const SignupPage = () => {
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
            /* Glossmorphism styles */
            backgroundColor: 'rgba(255, 255, 255, 0.8)', /* Semi-transparent white base */
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)', /* Multi-layered shadow */
            borderRadius: '15px', /* Rounded corners */
          }}>
            <Card.Body>
                   <Form>
        <h2>Sign up</h2>
        <p>Start by entering your medication details</p>

        <Form.Group controlId="fullName">
         <Form.Label>Full name</Form.Label>
         <Form.Control type="text" placeholder="Enter your full name" />
        </Form.Group>

        <Form.Group controlId="email">
         <Form.Label>Email</Form.Label>
         <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="password">
         <Form.Label>Password</Form.Label>
         <Form.Control type="password" placeholder="Enter your password" />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
         <Form.Label>Confirm password</Form.Label>
         <Form.Control type="password" placeholder="Confirm your password" />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
         <Form.Label>Phone number</Form.Label>
         <Form.Control type="tel" placeholder="Enter your phone number" />
        </Form.Group>

        <Form.Group controlId="termsCheckbox">
         <Form.Check type="checkbox" label="I agree to the Terms of Service" />
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
