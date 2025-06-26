import { Row, Col, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import teach from "../../assets/img/teach.jpeg";
import teach1 from "../../assets/img/teach1.jpeg";
import teach2 from "../../assets/img/teach2.jpeg";
import teach3 from "../../assets/img/teach3.jpeg";
import "./BecomeTutor.css";

const BecomeTutor = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      {/* Head Section */}
      <Row className="align-items-center mb-5 py-4 bg-light rounded-4 shadow-sm">
        <Col md={6} className="text-center text-md-start" style={{ marginTop: "50px" }}>
          <h1 className="mb-3 text-danger">Teach What You Love</h1>
          <p className="mb-4">
            Build your career as a tutor, find tuition jobs, and teach online. We handle the marketing and student search — you just focus on teaching!
          </p>
          <Button variant="outline-danger" size="lg" onClick={() => navigate("/signin")}>
            Start Teaching Today
          </Button>
        </Col>

        <Col md={6} className="text-center">
          <img src={teach} alt="Teach" style={{ width: "300px" }} className="img-fluid rounded-4 shadow" />
        </Col>
      </Row>

      {/* How it works section */}
      <h2 className="text-center text-danger mt-5 mb-4">How It Works?</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="how-card border-0 shadow-sm h-100 bg-light">
            <Card.Body>
              <Card.Title className="text-danger">1. Find Jobs</Card.Title>
              <Card.Text>
                Browse tuition jobs near you based on subject and location. Opportunities that match your skills await.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="how-card border-0 shadow-sm h-100 bg-danger text-white">
            <Card.Body>
              <Card.Title>2. Apply Instantly</Card.Title>
              <Card.Text>
                Apply to jobs you're interested in with just a few clicks using your teaching profile.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="how-card border-0 shadow-sm h-100 bg-light">
            <Card.Body>
              <Card.Title className="text-danger">3. Start Teaching</Card.Title>
              <Card.Text>
                Schedule classes, connect with students, and start earning while we handle marketing.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="align-items-center mb-5 mt-5 py-4">
        <Col xs={12}>
          <h2 className="text-center text-danger mb-5">Features</h2>
        </Col>

        <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
          <h1 className="mb-3 text-danger">Teach From Anywhere</h1>
          <p>
            Thousands of students are looking for a tutor like you. Start teaching from your home or any location that suits you.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <img src={teach1} alt="Teach Anywhere" className="img-fluid rounded-4 shadow" style={{ width: "90%", maxWidth: "400px" }} />
        </Col>
      </Row>

      <Row className="align-items-center mb-5 mt-5 py-4">
        <Col md={6} className="text-center">
          <img src={teach2} alt="Flexible Timing" className="img-fluid rounded-4 shadow" style={{ width: "90%", maxWidth: "400px" }} />
        </Col>
        <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
          <h1 className="mb-3 text-danger">Flexible Timing</h1>
          <p>
            Set your own working hours and fees. Share your credentials, availability, and teaching achievements. You're in control.
          </p>
        </Col>
      </Row>

      <Row className="align-items-center mb-5 mt-5 py-4">
        <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
          <h1 className="mb-3 text-danger">Earn More, Live More</h1>
          <p>
            Do what you love and earn while you're at it. Join TutorHubZone to grow your digital presence and reach more learners.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <img src={teach3} alt="Earn More" className="img-fluid rounded-4 shadow" style={{ width: "90%", maxWidth: "400px" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default BecomeTutor;
