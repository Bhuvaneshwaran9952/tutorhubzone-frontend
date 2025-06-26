import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import contact from "../../assets/img/Contact.jpeg";
import { useNavigate } from "react-router";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    contact: ""
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


    const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.contact) {
        alert("Please fill in all fields.");
        return;
    }

    localStorage.setItem("trainer_email", formData.email);
    localStorage.setItem("trainer_contact", formData.contact);

    navigate("/create-profile/submit");
    };
    const handlePrevious = () => {
    navigate("/create-profile/rate");
    };

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="mb-4">Contact Details</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
                name="contact"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.contact} 
                onChange={handleChange}
                required
            />
            </Form.Group>

            <div className="d-flex gap-3">
            <Button variant="secondary" type="button" onClick={handlePrevious}>
                Previous
            </Button>
            <Button variant="danger" type="submit">
                Next
            </Button>
            </div>
          </Form>
        </Col>

        <Col md={6}>
          <img
            src={contact}
            alt="Contact Illustration"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
