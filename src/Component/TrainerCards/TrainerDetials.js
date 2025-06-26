import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Button, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getTrainerById } from "../../server/trainer";

const TrainerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const response = await getTrainerById(id);
                setTrainer(response);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch trainer details");
                setLoading(false);
            }
        };
        fetchTrainer();
    }, [id]);

    if (loading) return <div className="text-center mt-5">Loading trainer details...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div>
            <Navbar />
            <div className="container mt-4 mb-4">
                <div
                    className="card mx-auto shadow-sm p-4"
                    style={{ maxWidth: "1000px", borderRadius: "1rem" }}
                >
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mb-3 text-warning">{trainer.name}</h4>
                            <h5 className="mb-3 text-warning">{trainer.title}</h5>
                            {/* <p className="mb-2"><strong>Trainer Title:</strong> {trainer.title}</p> */}
                            <p className="mb-2"><strong>Location:</strong> {trainer.location}</p>
                            <p className="mb-2"><strong>Contact Number:</strong> {trainer.contact}</p>
                            <p className="mb-2"><strong>Email Address:</strong> {trainer.email}</p>

                            <p className="mb-2">
                                <strong>Skills:</strong>{" "}
                                {Array.isArray(trainer.skills)
                                    ? trainer.skills.map((skill, index) => (
                                        <Badge bg="light" text="dark" key={index} className="me-2">
                                            {skill}
                                        </Badge>
                                    ))
                                    : typeof trainer.skills === "string"
                                    ? trainer.skills.split(",").map((skill, index) => (
                                        <Badge bg="warning" text="dark" key={index} className="me-2">
                                            {skill.trim()}
                                        </Badge>
                                    ))
                                    : <span className="text-muted">No skills listed</span>
                                }
                            </p>

                            <p className="mb-2"><strong>Experience:</strong> {trainer.experience}</p>
                            <p className="mb-2"><strong>Available On:</strong> {trainer.date_and_time}</p>
                            <p className="mb-2"><strong>Class Mood:</strong> {trainer.class_mood}</p>
                            <p className="mb-0"><strong>Mode of Training:</strong> {trainer.mode}</p>
                        </div>
                    </div>

                    <div className="text-center mt-4 d-flex justify-content-center gap-3">
                        <Button variant="secondary" onClick={() => navigate("/trainercards")}>
                            Back to Trainers
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDetails;
