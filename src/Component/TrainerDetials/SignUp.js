import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    alert('Sign Up Successful!');
    navigate('/create-profile');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h3 className="text-center mb-4 text-danger">Sign Up</h3>
        <Form onSubmit={handleSignUp}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="secondary" type="submit" className="w-100">Sign Up</Button>
        </Form>

        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Button variant="link" onClick={() => navigate('/signin')}>Sign In</Button>
        </div>
      </Card>
    </Container>
  );
};

export default SignUp;
