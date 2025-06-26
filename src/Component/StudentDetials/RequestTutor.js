import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const RequestTutor = () => {
  const [formData, setFormData] = useState({
    subject: "",
    place: {
      tutorPlace: false,
      online: false
    },
    details: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        place: {
          ...prev.place,
          [name]: checked
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    const mode = [];
    if (formData.place.tutorPlace) mode.push("TutorPlace");
    if (formData.place.online) mode.push("Online");

    localStorage.setItem("student_subject", formData.subject);
    localStorage.setItem("student_mode", mode.join(", "));
    localStorage.setItem("student_message", formData.details);

    navigate("/student-profile/location");
  };

  return (
    <Container className="py-4">
      <h1 className="text-danger text-center">Request a Tutor</h1>
      <p className="text-center">
        Submit your learning requirements and find tutors in your locality
      </p>

      <Form className="p-4 border rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label><h5>What do you want to learn ?</h5></Form.Label>
          <Form.Control
            type="text"
            name="subject"
            placeholder="Enter your subject"
            required
            value={formData.subject}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><h5>Tuition Place</h5></Form.Label>
          <Form.Check
            type="checkbox"
            label="At tutor's place"
            name="tutorPlace"
            checked={formData.place.tutorPlace}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Online"
            name="online"
            checked={formData.place.online}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><h5>Tuition Details (optional)</h5></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="details"
            placeholder="Enter your requirement"
            required
            value={formData.details}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="danger" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default RequestTutor;
