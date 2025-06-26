import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {getTrainerById} from "../../server/trainer"

const TrainerView = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchTrainer = async () => {
    try {
      const data = await getTrainerById(id); 
      console.log("Fetched trainer:", data); 
      setTrainer(data);  
    } catch (err) {
      setError("Failed to fetch trainer details");
    } finally {
      setLoading(false);
    }
  };

   fetchTrainer();
}, [id]);


  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h2>{error}</h2>
        <Button variant="secondary" className="mt-3" onClick={() => navigate("/")}>
          Back to Trainer
        </Button>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="container mt-5 text-center">
        <h2>Trainer not found</h2>
        <Button variant="secondary" className="mt-3" onClick={() => navigate("/")}>
          Back to Trainer
        </Button>
      </div>
    );
  }

  return (
    <div>
    <Navbar/>
    <div className="container mt-4 mb-4">
      <div className="card mx-auto p-4 shadow-sm" style={{ maxWidth: "1000px", borderRadius: "1rem" }}>
        <div>
          <h2 className="mb-2">{trainer.title}</h2>
          <h5 className="text-muted">{trainer.name}</h5>
        </div>
        <div className="mt-4">
          <p><strong className='text-muted p-3'>Location:</strong> {trainer.location}</p>
          <p><strong className='text-muted p-3'>Contact:</strong> {trainer.contact}</p>
          <p><strong className='text-muted p-3'>E-mail:</strong> {trainer.email}</p>
          <p><strong className='text-muted p-3'>Skills:</strong> {trainer.skills}</p>
          <p><strong className='text-muted p-3'>Experience:</strong> {trainer.experience}</p>
          <p><strong className='text-muted p-3'>Class Mood:</strong> {trainer.class_mood}</p>
          <p><strong className='text-muted p-3'>Mode:</strong> {trainer.mode}</p>
          <p><strong className='text-muted p-3'>Date & Time:</strong> {trainer.date_and_time}</p>
        </div>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to Trainer
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TrainerView;
