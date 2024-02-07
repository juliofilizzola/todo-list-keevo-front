import axios from 'axios';


const baseURL = import.meta.env.VITE_BASE_URL || 'http://host.docker.internal:3000';

const api = axios.create({
  baseURL,
});
export default api;