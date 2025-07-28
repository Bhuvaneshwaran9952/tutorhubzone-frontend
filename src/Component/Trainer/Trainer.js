import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { MdPersonSearch } from "react-icons/md";
import axios from "axios";
import './Trainer.css';
import {getAllTrainer, deleteTrainer} from "../../server/trainer";
import {useParams} from "react-router-dom"

const Trainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [trainerdata, setTrainerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIdx, startIdx + itemsPerPage);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await getAllTrainer();
        setTrainerData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trainer data:", err);
        setError("Failed to load trainer data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Filter data on search
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = trainerdata.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.title.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  }, [searchTerm, trainerdata]);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await deleteTrainer(id);
      alert("Trainer deleted successfully");
      setTrainerData(prev => prev.filter(item => item.id !== id));
      setFilteredData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting trainer:", error);
      alert("Failed to delete trainer");
    }
  };

  return (

    <Container className="mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded"
        style={{
        background: "linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%)", 
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", 
        }}
      >
        <h3 className="text-white">Add Your Details</h3>
        <Button variant="light" onClick={() => navigate('/addtrainer')}>
          + Add
        </Button>
      </div>

      {/* Search */}
      <Form className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <MdPersonSearch />
          </span>
          <Form.Control
            type="text"
            placeholder="Search by Trainer Name, Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Form>

      {/* Loading and Error */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}

      {/* Trainer Cards */}
      <Row>
        {currentItems.length === 0 ? (
          <div className="text-muted px-3">No trainers found.</div>
        ) : (
          currentItems.map((item) => (
            <Col key={item.id} md={4} sm={6} className="mb-4 d-flex">
              <Card className="trainer-card w-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.title}</Card.Title>
                    <h5 className="mb-2 text-muted">{item.name}</h5>
                    <p>Location:<strong className="text-muted p-2">{item.location}</strong></p>
                    <p>Skills:<strong className="text-muted p-2">{item.skills}</strong></p>
                    <p>Clas_Mood:<strong className="text-muted p-2">{item.class_mood}</strong></p>
                    <p>Mode:<strong className="text-muted p-2">{item.mode}</strong></p>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => navigate(`/trainer/${item.id}`)}
                      >
                        View Details
                      </Button>

                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`trainerupdate/${item.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this interview?")) {
                          handleDelete(item.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Trainer;
