import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {createByIt} from "../../server/buyit"

const StudentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    yearOfBirth: "",
    contact: "",
    email: ""
  });

  const years = Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrevious = () => {
    navigate("/student/location");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = localStorage.getItem("student_subject") || "";
    const mode = localStorage.getItem("student_mode") || "";
    const message = localStorage.getItem("student_message") || "";
    const location = localStorage.getItem("student_location") || "";
    const address = localStorage.getItem("student_address") || "";

    const payload = {
      name: formData.name,
      gender: formData.gender,
      year_of_birth: parseInt(formData.yearOfBirth),
      contact: formData.contact,
      email: formData.email,
      subject,
      mode,
      message,
      location,
      address,
      dateTime: new Date().toISOString()
    };

    try {
      const response = await createByIt(payload); 
      alert("Student data submitted successfully!");
      localStorage.clear();
      navigate("/thank-you");
    } catch (err) {
      const error = err.response?.data?.detail || "Submission failed";
      alert(error);
      console.error("Submission error:", err);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center text-danger">Request a Tutor</h2>
      <p className="text-center mb-4">Submit your learning requirements and find tutors in your locality</p>

      <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year of Birth</Form.Label>
          <Form.Select name="yearOfBirth" value={formData.yearOfBirth} onChange={handleChange} required>
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="tel"
            name="contact"
            placeholder="Enter your phone number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="justify-content-between">
          <Col xs="auto">
            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
          </Col>
          <Col xs="auto">
            <Button variant="danger" type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default StudentForm;
