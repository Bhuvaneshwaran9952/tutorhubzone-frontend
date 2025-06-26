import { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import skill from "../../assets/img/skill.jpeg";
import { useNavigate } from "react-router";

const Skills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [trainerId] = useState(1);
  const navigate = useNavigate();

  const handleChange = (selectedOptions) => {
    if (selectedOptions.length <= 5) {
      setSelectedSkills(selectedOptions);
    }
  };

 const handleNext = () => {
  if (selectedSkills.length === 0) {
    alert("Please select at least one skill.");
    return;
  }

  const skillsArray = selectedSkills.map((s) => s.value);
  localStorage.setItem("trainer_skills", skillsArray.join(","));
  navigate("/create-profile/preferred-type");
};

  const handlePrevious = () => {
    navigate("/create-profile/subject");
  };

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4">
          <h2 className="mb-3">Add up to 5 skills (type or select)</h2>

          <CreatableSelect
            isMulti
            placeholder="Type skills like HTML, CSS, React, etc."
            value={selectedSkills}
            onChange={handleChange}
            className="mb-3"
          />

          <div className="d-flex gap-3 mt-3">
            <Button variant="secondary" onClick={handlePrevious}>
            Previous
            </Button>
           <Button variant="danger" onClick={handleNext}>Next</Button>
          </div>
        </Col>

        <Col md={6}>
          <img src={skill} alt="Skills" className="img-fluid rounded shadow" />
        </Col>
      </Row>
    </Container>
  );
};

export default Skills;
