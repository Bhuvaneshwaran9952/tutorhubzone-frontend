import { useState } from "react";
import { Card, Container, Form, Row, Col, Button } from "react-bootstrap";
import { RiCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import {createTrainer} from "../../server/trainer"

const AddTrainer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    contact: "",
    email: "",
    location: "",
    skills: "",
    experience: "",
    date_and_time: "",
    class_mood: "",
    mode: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        skills: formData.skills.split(",").map(skill => skill.trim())
      };
      const response = await createTrainer(dataToSend); 
      alert("Trainer added successfully!");
      console.log("Response:", response.data);
      navigate("/"); 
    } catch (error) {
      console.error("Error adding trainer:", error);
      alert("Failed to add trainer.");
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <Card className="p-4 shadow-lg rounded-2xl">
        <Card.Header className="d-flex justify-content-between align-items-center bg-secondary text-white mb-3">
          <h3 className="mb-0">Add Your Detail</h3>
          <Link to={"/"}>
            <RiCloseFill style={{ color: "white" }} />
          </Link>
        </Card.Header>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formname">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formtitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formcontact">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="formemail">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Select Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date_and_time"
                value={formData.date_and_time}
                onChange={handleChange}
                required
              />
            </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Class Mood</Form.Label>
              <Form.Select
                name="class_mood"
                value={formData.class_mood}
                onChange={handleChange}
                required
              >
                <option value="">Select a class mode</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
              </Form.Select>
            </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mode</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Offline"
                name="mode"
                value="Offline"
                checked={formData.mode === "Offline"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Online"
                name="mode"
                value="Online"
                checked={formData.mode === "Online"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formLocation" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formSkills" className="mb-3">
            <Form.Label>Skills (comma separated)</Form.Label>
            <Form.Control type="text" name="skills" value={formData.skills} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formExperience" className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control type="text" name="experience" value={formData.experience} onChange={handleChange} required />
          </Form.Group>

          <div className="text-center">
            <Button variant="danger" type="submit" className="px-4">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddTrainer;
