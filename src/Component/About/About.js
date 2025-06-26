import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import trainer from "../../assets/img/trainer.jpg";
import trainer1 from "../../assets/img/trainer1.jpg";
import trainer2 from "../../assets/img/trainer2.jpeg";
import trainer3 from "../../assets/img/trainer3.jpeg";
import trainer4 from "../../assets/img/trainer4.jpeg";
import trainer5 from "../../assets/img/trainer5.jpeg";
import trainer6 from "../../assets/img/trainer6.jpeg";
import trainer7 from "../../assets/img/trainer7.jpeg";
import './About.css';

const About = () => {
  const trainers = [
    {
      title: "Full Stack Trainer",
      desc: "Learn MERN and Django full stack development with real-world projects and hands-on sessions.",
      img: trainer2,
    },
    {
      title: "AI & Machine Learning Trainer",
      desc: "Master core AI concepts including machine learning, deep learning, neural networks, and model deployment using Python, TensorFlow, and real-world projects.",
      img: trainer5,
    },
    {
      title: "Digital Marketing Trainer",
      desc: "Learn SEO, Google Ads, social strategy, email marketing, and analytics with practical tools.",
      img: trainer6,
    },
    {
      title: "Data Science Mentor",
      desc: "Master data analysis, machine learning, and Python with expert-level guidance and live support.",
      img: trainer3,
    },
    {
      title: "DevOps Specialist",
      desc: "Get trained in Docker, Kubernetes, CI/CD pipelines and deployment automation with hands-on labs.",
      img: trainer4,
    },
    {
      title: ".NET Trainer",
      desc: "Master C#, ASP.NET Core, Entity Framework, and Angular with enterprise-level project training.",
      img: trainer7,
    },
  ];

  return (
    <div className="about-page">
      <div className="py-5 bg-light text-center">
        <h1 className="text-danger fw-bold">About Us</h1>
        <p className="lead text-muted mt-3 px-3">
          Empowering careers through skill-based training and hands-on experience with industry mentors.
        </p>
      </div>

      {/* First About Section */}
      <Container className="my-5">
        <Row className="align-items-center g-5">
          <Col md={6}>
            <img src={trainer} alt="Trainer" className="img-fluid rounded shadow" />
          </Col>
          <Col md={6}>
            <h4 className="text-danger mb-3">What We Do?</h4>
            <p className="text-muted">
              Over 50,000 trainers have joined our platform. From React to Node.js, we have experts in every field. Become a Trainer in under a minute and start your teaching journey.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Second About Section */}
      <Container className="my-5">
        <Row className="align-items-center g-5 flex-md-row-reverse">
          <Col md={6}>
            <img src={trainer1} alt="Trainer" className="img-fluid rounded shadow" />
          </Col>
          <Col md={6}>
            <h4 className="text-danger mb-3">Why Choose Us?</h4>
            <p className="text-muted">
            Learn to succeed. Book tutors with confidence and excel in your goals. Improve skills and scores with the help of our expert teachers.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Trainers Section */}
      <Container className="my-5">
        <h3 className="text-center text-danger mb-4">Our Expert Trainers</h3>
        <Row className="g-4">
          {trainers.map((t, i) => (
            <Col key={i} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src={t.img} className="trainer-card-img rounded-top" />
                <Card.Body>
                  <Card.Title className="text-danger">{t.title}</Card.Title>
                  <Card.Text className="text-muted">{t.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default About;
