// src/Component/Footer/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import TutorHubZone from "../../assets/img/TutorHubZone.png"

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col md={4} sm={12} className="mb-3 d-flex flex-column align-items-start">
            <img src={TutorHubZone} alt="TutorHub Logo" className="img-fluid mb-2" style={{ maxWidth: "100px" }} />
            <p>
              Hands-on tech training from industry experts. Learn faster, build stronger skills,
              and grow your career with personalized guidance.
            </p>
          </Col>

          <Col md={4} sm={6} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/trainers">Trainers</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </Col>

          <Col md={4} sm={6}>
            <h5>Contact</h5>
            <p>Email: info@tutorhubzone.com</p>
            <p>Phone: +91 89460 04709</p>
            <p> No-218, Velachery Main Rd, Selvam Nagar, Pallikaranai, Chennai, Tamil Nadu 600100</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <small>© {new Date().getFullYear()} Deck Stack Technologies. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
