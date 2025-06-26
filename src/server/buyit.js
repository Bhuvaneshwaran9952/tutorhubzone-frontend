
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Specific functions — no need to pass URLs in components
export const getAllByIt = async () => {
  const res = await apiClient.get("/buyform/");
  return res.data;
};

export const getBuyItById = async (id) => {
  const res = await apiClient.get(`/buyform/${id}`);
  return res.data;
};

export const createByIt = async (trainerData) => {
  const res = await apiClient.post("/buyform/", trainerData);
  return res; 
};

export const updateByIt= async (id, data) => {
  const res = await apiClient.put(`/buyform/${id}`, data);
  return res.data;
};

export const patchByIt = async (id, data) => {
  const res = await apiClient.patch(`/buyform/${id}`, data);
  return res.data;
};

export const deleteByIt = async (id) => {
  const res = await apiClient.delete(`/buyform/${id}`); 
  return res.data;
};