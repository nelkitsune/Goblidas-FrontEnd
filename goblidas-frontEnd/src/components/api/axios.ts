import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Cambiá esto según tu backend
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnb2JsaWRhcy5jb20iLCJpYXQiOjE3NDgxODI5MTIsImV4cCI6MTc0ODIxODkxMn0.IHegpI3mhdAgsEDXYnhe2Smw_VMpE2jZbsqt7ltcYPM'
    },
});

export default api;