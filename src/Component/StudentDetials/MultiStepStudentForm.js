import React, { useState } from "react";
import RequestTutor from "./RequestTutor";
import Location from "./Location";
import StudentForm from "./StudentForm";

const MultiStepStudentForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    subject: "",   
    mode: "",      
    message: "",    
    location: "",     
    address: "",      
    name: "",          
    gender: "",        
    yearOfBirth: "", 
    contact: "",       
    email: ""          
  });

  const nextStep = () => setStep((prev) => prev + 1);

  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  console.log("Current Step:", step);
  console.log("Form Data:", formData);

  switch (step) {
    case 1:
      return (
        <RequestTutor
          data={formData}
          onChange={handleChange}
          onNext={nextStep}
        />
      );

    case 2:
      return (
        <Location
          data={formData}
          onChange={handleChange}
          onNext={nextStep}
          onPrevious={prevStep}
        />
      );

    case 3:
      return (
        <StudentForm
          data={formData}
          onChange={handleChange}
          onPrevious={prevStep}
        />
      );

    default:
      return <h3>Invalid step. Please reload the form.</h3>;
  }
};

export default MultiStepStudentForm;
