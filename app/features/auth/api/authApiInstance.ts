import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL  // Define in .env.local
});



export default API;
