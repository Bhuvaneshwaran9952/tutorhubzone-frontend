import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import salary from "../../assets/img/salary.jpeg";
import { useNavigate } from "react-router";

const Rate = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [experience, setExperienceLevel] = useState("");
  const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!hourlyRate || !monthlyRate || !currency || !experience) {
        alert("Please fill in all fields.");
        return;
    }

    localStorage.setItem("trainer_hourly_rate", hourlyRate);
    localStorage.setItem("trainer_monthly_rate", monthlyRate);
    localStorage.setItem("trainer_currency", currency);
    localStorage.setItem("trainer_experience", experience);

    navigate("/create-profile/contact");
    };

    const handlePrevious = () => {
    navigate("/create-profile/location");
    };

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="mb-4">Your Trainer Salary Expectations</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Hourly Rate (in Chennai)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter hourly rate"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expected Monthly Salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter monthly salary"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="INR">INR - ₹</option>
                <option value="USD">USD - $</option>
                <option value="EUR">EUR - €</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Experience Level</Form.Label>
              <Form.Select
                value={experience}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="">-- Select Experience --</option>
                <option value="0-1">0-1 Years</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5+">5+ Years</option>
              </Form.Select>
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
            src={salary}
            alt="Salary Illustration"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Rate;
