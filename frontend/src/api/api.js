import axios from 'axios'

const BACKEND_URL = 'http://localhost:8080/api/auth';

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;