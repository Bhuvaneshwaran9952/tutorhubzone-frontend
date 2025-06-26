import { useState } from "react";
import { Navbar, Offcanvas, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";
import { PiChalkboardTeacher } from "react-icons/pi";
import { SiAboutdotme } from "react-icons/si";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import TutorHubZone from "../../assets/img/TutorHubZone.png"

const CustomNavbar = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      {/* Top Navbar */}
      <Navbar className="custom-navbar d-flex justify-content-between align-items-center px-3">
        <div className="d-flex align-items-center">
          <Button variant="light" className="menu-btn me-3" onClick={handleShow}>
            <IoMdMenu />
          </Button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Button variant="dark" size="sm" as={Link} to="/signin">
            Sign In
          </Button>
          <Button variant="dark" size="sm" as={Link} to="/signup">
            Sign Up
          </Button>
          <Button variant="danger" size="sm" as={Link} to="/trainerdetails">
            Become a Trainer
          </Button>
        </div>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} backdrop="static" placement="start">
        <Offcanvas.Header closeButton>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img src={TutorHubZone} alt="Logo" style={{ height: "50px" }} />
            <h1 style={{ margin: 0, fontSize: "24px" }}>
              <span style={{ color: "red" }}>Tutor</span>
              <span style={{ color: "#4B5563" }}>HubZone</span>
            </h1>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column mb-4">
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              <TiHomeOutline className="me-2" />
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" onClick={handleClose}>
              <SiAboutdotme className="me-2" />
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/trainers" onClick={handleClose}>
              <PiChalkboardTeacher className="me-2" />
              Trainers
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" onClick={handleClose}>
              <PiChalkboardTeacher className="me-2" />
              Contact Us
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
