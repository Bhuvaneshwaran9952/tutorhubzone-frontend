import { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Alert,
  Pagination,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import {
  FaRegBookmark,
  FaBookmark,
  FaReact,
  FaAngular,
  FaPython,
  FaJava,
  FaNodeJs,
  FaLaptopCode,
  FaDatabase,
  FaAws,
  FaBullhorn,
  FaRobot,
} from "react-icons/fa";
import { SiDotnet } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import "./TrainerCards.css";
import { getAllTrainer } from "../../server/trainer";
import { createByIt } from "../../server/buyit";

// Get icon based on trainer title
const getIconForTitle = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("react")) return <FaReact className="me-2 text-primary" />;
  if (t.includes("angular")) return <FaAngular className="me-2 text-danger" />;
  if (t.includes("python")) return <FaPython className="me-2 text-warning" />;
  if (t.includes("java")) return <FaJava className="me-2 text-danger" />;
  if (t.includes("node")) return <FaNodeJs className="me-2 text-success" />;
  if (t.includes("full stack") || t.includes("developer"))
    return <FaLaptopCode className="me-2 text-info" />;
  if (t.includes("data")) return <FaDatabase className="me-2 text-secondary" />;
  if (t.includes("devops") || t.includes("aws"))
    return <FaAws className="me-2 text-dark" />;
  if (t.includes("marketing"))
    return <FaBullhorn className="me-2 text-warning" />;
  if (t.includes("dot net") || t.includes(".net"))
    return <SiDotnet className="me-2 text-primary" />;
  if (t.includes("ai") || t.includes("machine"))
    return <FaRobot className="me-2 text-secondary" />;
  return null;
};

const TrainerCards = () => {
  const [trainerData, setTrainerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [bookmarkedTrainers, setBookmarkedTrainers] = useState(() => {
    const saved = localStorage.getItem("bookmarkedTrainers");
    return saved ? JSON.parse(saved) : [];
  });

  // BuyIt Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const itemsPerPage = 10;
  const today = new Date().setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllTrainer();
        const upcoming = response.filter(
          (trainer) => new Date(trainer.date) >= today
        );
        setTrainerData(upcoming.length > 0 ? upcoming : response);
      } catch (err) {
        setError("Error fetching trainer data");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  const toggleBookmark = (trainerId) => {
    setBookmarkedTrainers((prev) => {
      const updated = prev.includes(trainerId)
        ? prev.filter((id) => id !== trainerId)
        : [...prev, trainerId];
      localStorage.setItem("bookmarkedTrainers", JSON.stringify(updated));
      return updated;
    });
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

      if (response?.status === 200 || response?.status === 201) {
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

  const visibleTrainers = showBookmarkedOnly
    ? trainerData.filter((t) => bookmarkedTrainers.includes(t.id))
    : trainerData;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visibleTrainers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(visibleTrainers.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <h3 className="text-center text-danger mb-4">Our Trainers</h3>

      <div className="text-center mb-3">
        <Button
          variant={showBookmarkedOnly ? "success" : "outline-success"}
          onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
        >
          {showBookmarkedOnly ? "Show All Trainers" : "Show Bookmark"}
        </Button>
      </div>

      {loading ? (
        <p className="text-muted">Loading trainers...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : visibleTrainers.length === 0 ? (
        <Alert variant="warning">No trainers found.</Alert>
      ) : (
        <Row className="mt-4">
          {currentItems.map((trainer) => (
            <Col key={trainer.id} lg={6} md={6} sm={12} className="mb-4">
              <Card className="border border-success card-hover shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">{trainer.name}</h5>
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(trainer.id);
                      }}
                    >
                      {bookmarkedTrainers.includes(trainer.id) ? (
                        <FaBookmark style={{ color: "gold" }} />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </Button>
                  </div>
                  <p className="mb-1 d-flex align-items-center">
                    {getIconForTitle(trainer.title)}
                    <strong>{trainer.title}</strong>
                  </p>
                  <p className="mb-1 text-muted">{trainer.location}</p>
                  <p className="mb-1 text-muted">Experience: {trainer.experience}</p>
                  <p className="mb-1 text-muted">Gender: {trainer.gender}</p>
                  <p className="mb-1 text-muted">Class Type: {trainer.class_type}</p>
                  <p className="mb-3 text-muted">Mode: {trainer.mode}</p>

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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* Modal */}
      {selectedTrainer && (
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
      )}
    </Container>
  );
};

export default TrainerCards;
