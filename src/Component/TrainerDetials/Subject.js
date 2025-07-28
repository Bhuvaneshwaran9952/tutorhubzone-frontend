import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Col, Container, Row, Form, Button, ListGroup, Alert
} from "react-bootstrap";
import subject from "../../assets/img/subject.webp";
import { useNavigate } from "react-router";

const allSubjects = [
  "Full Stack", "Java Full Stack","Digital marketing", "DOT NET", "React", "Angular", "Python", "Java", "Node", "Data Science", "AI", "Data Analyst", "SQL", "Word", "Machine Learning"
];

const Subject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = allSubjects.filter(subject =>
      subject.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered : []);
  };

  const handleSelect = (subject) => {
    setSelectedSubject(subject);
    setSearchTerm(subject);
    setSuggestions([]);
  };

  const handleNext = () => {
    if (!selectedSubject) {
      alert("Please select a subject before proceeding.");
      return;
    }
    localStorage.setItem("trainer_title", selectedSubject);
    navigate("/create-profile/skills");
  };

  const handlePrevious = () => {
    navigate("/create-profile");
  };

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4">
          <h2 className="mb-3">Which subject would you like to teach?</h2>
          <div className="position-relative">
            <Form.Control
              type="search"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search subject..."
              className="mb-2"
            />
            <ListGroup className="position-absolute w-100 z-1">
              {suggestions.map((s, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => handleSelect(s)}
                >
                  {s}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <div className="d-flex gap-3 mt-3">
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant="danger" onClick={handleNext}>
              Next
            </Button>
          </div>

          {successMsg && (
            <Alert variant="success" className="mt-3">
              {successMsg}
            </Alert>
          )}
          {errorMsg && (
            <Alert variant="danger" className="mt-3">
              {errorMsg}
            </Alert>
          )}
        </Col>

        <Col md={6}>
          <img
            src={subject}
            alt="Subject Illustration"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Subject;
