import { createContext, useContext, useState } from "react";

const TrainerFormContext = createContext();

export const TrainerFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <TrainerFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </TrainerFormContext.Provider>
  );
};

export const useTrainerForm = () => useContext(TrainerFormContext);
