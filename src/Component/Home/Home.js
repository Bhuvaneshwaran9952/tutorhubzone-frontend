import React, { useEffect, useState } from "react";
import {
  Carousel,
  Container,
  Table,
  Spinner,
  Alert,
  Button,
  Modal,
  Form
} from "react-bootstrap";
import "./Home.css";
import trainer from "../../assets/img/trainer.jpg";
import trainer1 from "../../assets/img/trainer1.jpg";
import { getAllTrainer } from "../../server/trainer";
import { useNavigate } from "react-router";
import { createByIt } from "../../server/buyit";

const Home = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sliderImages = [
    "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    "https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg",
    "https://images.pexels.com/photos/4145191/pexels-photo-4145191.jpeg"
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrainers = trainers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trainers.length / itemsPerPage);

  const [showModal, setShowModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTrainer();
        setTrainers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trainer data:", err);
        setError("Failed to load trainer data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePush = (trainer) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        student_name: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        trainer_id: selectedTrainer.id,
        trainer_name: selectedTrainer.name,
        trainer_title: selectedTrainer.title,
      };

      const response = await createByIt(payload);

      if (response.ok || response.status === 200 || response.success) {
        alert("Your request has been submitted successfully!");
        setShowModal(false);
        setFormData({ studentName: "", email: "", phone: "" });
      } else {
        alert("Something went wrong while submitting.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit.");
    }
  };
  return (
    <div className="slider-section">
      <Carousel fade>
        {[1, 2, 3].map((item, i) => (
          <Carousel.Item key={i}>
            <div className={`carousel-bg bg${item}`}>

            <div
              className="text-white text-center"
              style={{
                backgroundImage: `url(${sliderImages[i]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "600px",
                width: "100vw", 
                margin: "0",
                padding: "100px 20px", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <h1 className="display-5 fw-bold text-danger">
                {i === 0
                  ? "Explore Skilled Tutors Across India"
                  : i === 1
                  ? "Learn from Industry Experts"
                  : "Boost Your Career"}
              </h1>
              <p
                className="lead"
                style={{
                  color: "white",
                  textShadow: "2px 2px 5px rgba(5, 5, 5, 0.8)"
                }}
              >
                {i === 0
                  ? "With the aid of excellent tutors, pass tests, pick up new skills, and raise grades."
                  : i === 1
                  ? "Connect with trainers who have real-world experience."
                  : "Choose tech courses and mentors to match your goals."}
              </p>
            </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-5">
        <h2 className="text-center text-danger mb-4">
          How it works for Students & Parents
        </h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          <div className="p-4 bg-light border rounded shadow-sm text-center" style={{ maxWidth: 300 }}>
            <h5 className="text-danger">1. Post your learning needs</h5>
            <p className="text-muted">Submit your tutor requirement easily. We’ll do the rest.</p>
          </div>

          <div className="p-4 bg-secondary text-white border rounded shadow-sm text-center" style={{ maxWidth: 300 }}>
            <h5>2. Get tutor applications</h5>
            <p>Receive matching tutor applications within 48 hours.</p>
          </div>

          <div className="p-4 bg-light border rounded shadow-sm text-center" style={{ maxWidth: 300 }}>
            <h5 className="text-danger">3. Start learning</h5>
            <p className="text-muted">Trial classes available. Hire when satisfied.</p>
          </div>
        </div>
      </Container>

      <div className="bg-light py-5">
        <Container className="d-flex flex-column flex-md-row align-items-center gap-4">
          <img src={trainer} alt="trainer" className="img-fluid rounded shadow" style={{ maxWidth: 400 }} />
          <p className="text-muted fs-5">
            Over <strong>50,000</strong> trainers have joined our platform. From React to Node.js, we have experts in every field. <strong>Become a Trainer</strong> in under a minute and start your teaching journey.
          </p>
        </Container>
      </div>

      <div className="bg-secondary text-white py-5">
        <Container className="d-flex flex-column flex-md-row align-items-center gap-4">
          <p className="fs-5">
            Learn to succeed. Book tutors with confidence and excel in your goals. Improve skills and scores with the help of our expert teachers.
          </p>
          <img src={trainer1} alt="trainer" className="img-fluid rounded shadow" style={{ maxWidth: 400 }} />
        </Container>
      </div>

      <Container className="py-5">
        <h4 className="mb-4 text-danger">Trainer Availability</h4>

        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : trainers.length === 0 ? (
          <Alert variant="warning">No trainers found.</Alert>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-light shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Class Type</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTrainers.map((trainer) => (
                  <tr key={trainer.id}>
                    <td>{trainer.name}</td>
                    <td>{trainer.title || "N/A"}</td>
                    <td>{trainer.class_type || "Not Specified"}</td>
                    <td className="text-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedTrainer(trainer);
                        setShowModal(true);
                      }}
                    >
                      Buy it
                    </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center mt-3">
              <ul className="custom-pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                  <li key={number} className={`custom-page-item ${currentPage === number ? "active" : ""}`}>
                    <button
                      onClick={() => handlePageChange(number)}
                      className="custom-page-link"
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Container>

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Buy It - Trainer: {selectedTrainer?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
