import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, data } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  CloseButton,
} from "react-bootstrap";
import axios from "axios";
import {getTrainerById, updateTrainer} from "../../server/trainer"

const TrainerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    location: "",
    contact: "",
    email: "",
    skills: "",
    experience: "",
    class_mood: "",
    mode: "",
    date_and_time: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch trainer by ID
useEffect(() => {
  const fetchTrainer = async () => {
    try {
      const trainer = await getTrainerById(id); 
      setFormData({
        ...trainer,
        date_and_time: trainer.date_and_time?.split("T")[0] || "",
      });
    } catch (error) {
      console.error("Error fetching trainer:", error);
    }
  };
  fetchTrainer();
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Contact must be 10 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await updateTrainer(formData.id, formData);
      alert("Trainer updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update trainer");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Container className="mt-4 mb-4">
      <Card className="p-4 shadow-lg rounded-2xl">
        <Card.Header className="d-flex justify-content-between align-items-center text-white mb-3"
          style={{
          background: "linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%)", 
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", }}
        >
          <h2 className="mb-0">Update Trainer</h2>
          <Link to="/">
            <CloseButton variant="white" />
          </Link>
        </Card.Header>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  isInvalid={!!errors.contact}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contact}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </Form.Group>

              <Form.Group>
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Form.Group>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Class Mood</Form.Label>
                <Form.Control
                  type="text"
                  name="class_mood"
                  value={formData.class_mood}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Mode</Form.Label>
                <Form.Control
                  type="text"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control
              type="date"
              name="date_and_time"
              value={formData.date_and_time}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Trainer"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default TrainerUpdate;
