import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL  // Define in .env.local
});


export default API;
