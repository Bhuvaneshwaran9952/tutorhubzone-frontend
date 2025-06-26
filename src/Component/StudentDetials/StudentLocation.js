import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const Location = () => {
  const [formData, setFormData] = useState({
    location: "",
    address: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    localStorage.setItem("student_location", formData.location);
    localStorage.setItem("student_address", formData.address);

    navigate("/student-profile/form");
  };

  const handlePrevious = () => {
    navigate("/student-profile")
  };

  return (
    <Container className="py-4">
      <h1 className="text-danger text-center">Request a Tutor</h1>
      <p className="text-center">
        Submit your learning requirements and find tutors in your locality
      </p>

      <Form className="p-4 border rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label><h5>Select your city</h5></Form.Label>
          <Form.Select name="location" required value={formData.location} onChange={handleChange}>
            <option value="">-- Select City --</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Madurai">Madurai</option>
            <option value="Trichy">Trichy</option>
            <option value="Salem">Salem</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><h5>Enter your locality</h5></Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Anna Nagar, RS Puram"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="text-center mt-4">
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button variant="secondary" onClick={handlePrevious}>
                Previous
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="danger" onClick={handleNext}>
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Container>
  );
};

export default Location;
