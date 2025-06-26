import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    yearOfBirth: "",
  });

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    // Simple validation check
    if (!formData.name || !formData.gender || !formData.yearOfBirth) {
      alert("Please fill out all required fields.");
      return;
    }

    // Save data temporarily in localStorage
    localStorage.setItem("trainer_name", formData.name);
    localStorage.setItem("trainer_gender", formData.gender);
    localStorage.setItem("trainer_year_of_birth", formData.yearOfBirth);

    setSubmitted(true);
    navigate("/create-profile/subject"); 
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center text-danger mb-4">Create Your Profile</h3>

        {submitted ? (
          <Alert variant="success">
            <h4>Welcome, {formData.name}!</h4>
            <p>Your profile step 1 is complete.</p>
          </Alert>
        ) : (
          <Form onSubmit={handleNext}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year of Birth</Form.Label>
              <Form.Select
                name="yearOfBirth"
                required
                value={formData.yearOfBirth}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100">
              Next
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default CreateProfile;
