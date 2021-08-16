import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://api.thehub.wmdd.ca',
});

export default api;
