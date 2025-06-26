import React, { useState } from "react";
import { Form, Button, Modal, Alert, Container } from "react-bootstrap";
import axios from "axios";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual backend endpoint
      const response = await axios.post("http://localhost:8000/students/", formData);
      if (response.status === 200 || response.status === 201) {
        setAlert("Student data saved successfully!");
        setShowModal(true);
        setFormData({ name: "", email: "", contact: "", address: "" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setAlert("Failed to submit student data.");
      setShowModal(true);
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "40px" }}>
      <h4 className="text-center mb-4 text-primary">Student Registration Form</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="contact" className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter contact number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>

      {/* Modal Popup */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submission Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={alert.includes("success") ? "success" : "danger"}>
            {alert}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StudentForm;
