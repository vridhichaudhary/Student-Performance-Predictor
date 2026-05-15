import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const uploadCSV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/students/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getDashboardData = async (studentId) => {
    const response = await api.get(`/analysis/dashboard/${studentId}/`);
    return response.data;
};

export const sendChatMessage = async (studentId, message) => {
    const response = await api.post('/chat/message/', {
        student_id: studentId,
        message: message,
    });
    return response.data;
};

export default api;
