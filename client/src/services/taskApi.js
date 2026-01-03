import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: `${API_BASE_URL}/tasks`,
});

export const fetchTasks = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post('/', task);
  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const response = await api.put(`/${id}`, { status });
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/${id}`);
};
