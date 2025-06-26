import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import location from "../../assets/img/Location.jpeg";
import axios from "axios";
import { useNavigate } from "react-router";

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [preferredMode, setPreferredMode] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleModeSelect = (mode) => {
    setPreferredMode(mode);
  };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLocation || !preferredMode) {
        alert("Please select both location and preferred mode.");
        return;
    }

    localStorage.setItem("trainer_location", selectedLocation);
    localStorage.setItem("trainer_mode", preferredMode);

    navigate("/create-profile/rate");
    };

    const handlePrevious = () => {
    navigate("/create-profile/preferred-type");
    };

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="mb-4">Your Address</h2>
          <Form onSubmit={handleSubmit}>
            {/* Location Dropdown */}
            <Form.Group controlId="locationSelect" className="mb-4">
              <Form.Label>Select your location</Form.Label>
              <Form.Select
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="">-- Choose a location --</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Delhi">Delhi</option>
              </Form.Select>
            </Form.Group>

            {/* Mode Selection */}
            <h5 className="mb-3">Preferred Place of Teaching</h5>
            <div className="mb-4 d-flex gap-3">
              <Button
                variant={preferredMode === "At institute" ? "success" : "outline-secondary"}
                onClick={() => handleModeSelect("At institute")}
              >
                At institute
              </Button>
              <Button
                variant={preferredMode === "Online" ? "success" : "outline-secondary"}
                onClick={() => handleModeSelect("Online")}
              >
                Online
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex gap-3">
              <Button type="submit" variant="secondary" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="submit" variant="danger">
                Next
              </Button>
            </div>
          </Form>
        </Col>

        {/* Image Side */}
        <Col md={6}>
          <img
            src={location}
            alt="Location Illustration"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Location;
