import axios from 'axios';


const baseURL = import.meta.env.BASE_URL;

const api = axios.create({
  baseURL,
});
export default api;