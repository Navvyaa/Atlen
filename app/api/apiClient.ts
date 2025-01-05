import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://13.202.249.75:8000/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkEmail = async (email: string) => {
    const response = await apiClient.post('/auth/check-email/', { email });
    return response.data;
};

export const registerUser = async (data: { email: string; password: string; confirm_password: string; first_name: string; last_name: string }) => {
    console.log(data)
    const response = await apiClient.post('/auth/register/', data);
    return response.data;
};

export default apiClient;