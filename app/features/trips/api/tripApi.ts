import { PostTripRequest } from "../types";
import API from '../../auth/api/authApiInstance';
import Cookies from 'js-cookie';

export const postTripAPI = async (data: PostTripRequest) => {
    const token = Cookies.get('accessToken');
    const response = await API.post('/api/trips/', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getTripsAPI = async () => {
    const token = Cookies.get('accessToken');
    const response = await API.get('/api/trips/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};