import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import GroupClass from "../../assets/img/GroupClass.jpeg";
import { useNavigate } from "react-router-dom";

const PreferredType = () => {
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (!selectedType) {
      alert("Please select a class type");
      return;
    }

    localStorage.setItem("trainer_class_type", selectedType);

    navigate("/create-profile/location");
  };

  const handlePrevious = () => {
    navigate("/create-profile/skills");
  };

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="mb-4">Your preferred class type</h2>

          <div className="d-flex gap-3 mb-4">
            <Button
              variant={selectedType === "Private" ? "primary" : "outline-primary"}
              onClick={() => handleSelect("Private")}
            >
              Private Class
            </Button>

            <Button
              variant={selectedType === "Group" ? "primary" : "outline-primary"}
              onClick={() => handleSelect("Group")}
            >
              Group Class
            </Button>
          </div>

          <div className="d-flex gap-3">
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant="danger" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Col>

        <Col md={6}>
          <img src={GroupClass} alt="Group class" className="img-fluid rounded shadow" />
        </Col>
      </Row>
    </Container>
  );
};

export default PreferredType;
