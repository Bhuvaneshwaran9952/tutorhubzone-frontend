import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser?.email === email && storedUser?.password === password) {
      alert('Login Successful!');
      navigate('/create-profile');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h3 className="text-center mb-4 text-danger">Sign In</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100">Sign In</Button>
        </Form>

        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Button variant="link" onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
      </Card>
    </Container>
  );
};

export default SignIn;
