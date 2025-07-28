import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import submit from "../../assets/img/Submit.jpeg";
import { createTrainer } from "../../server/trainer";

const Submit = () => {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);

  const getValue = (key) => localStorage.getItem(key) || "";

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("name", getValue("trainer_name"));
    formData.append("gender", getValue("trainer_gender"));
    formData.append("year_of_birth", getValue("trainer_year_of_birth"));
    formData.append("contact", getValue("trainer_contact"));
    formData.append("email", getValue("trainer_email"));
    formData.append("location", getValue("trainer_location"));
    formData.append("skills", getValue("trainer_skills"));
    formData.append("experience", getValue("trainer_experience"));
    formData.append("hourly_rate", getValue("trainer_hourly_rate"));
    formData.append("monthly_rate", getValue("trainer_monthly_rate"));
    formData.append("currency", getValue("trainer_currency"));
    formData.append("date_and_time", getValue("trainer_date_and_time"));
    formData.append("class_type", getValue("trainer_class_type"));
    formData.append("class_mood", getValue("trainer_class_mood"));
    formData.append("mode", getValue("trainer_mode"));
    formData.append("title", getValue("trainer_title"));
    formData.append("resume", resumeFile); // attach resume file

    try {
      const response = await createTrainer(formData);
      alert("Trainer profile submitted successfully!");
      localStorage.clear();
      navigate("/trainers");
    } catch (err) {
      const error = err.response?.data?.detail || err.message;
      alert("Submission failed: " + error);
      console.error("Error uploading:", err);
    }
  };

  const handlePrevious = () => {
    navigate("/create-profile/contact");
  };

  return (
    <Container className="p-4">
      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="mb-4">Review & Submit</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="resume" className="mb-3">
              <Form.Label>Upload Resume</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <div className="d-flex gap-3">
              <Button variant="secondary" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="submit" variant="danger">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={6}>
          <img src={submit} alt="Submit Visual" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Submit;
