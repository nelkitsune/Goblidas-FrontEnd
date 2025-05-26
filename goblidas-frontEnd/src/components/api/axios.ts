import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Cambiá esto según tu backend
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnb2JsaWRhcy5jb20iLCJpYXQiOjE3NDgyNzY0MDcsImV4cCI6MTc0ODMxMjQwN30.1YXqRE0oaLja6DD2yIo_FqdikFuLAZNM1rzXg4-S_Vw'
    },
});

export default api;