import axios from 'axios';
import { AUTH_CONFIG } from '../../config';
import auth from '../auth/AuthService';

const http = axios.create({
    baseURL: AUTH_CONFIG.apiUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});

http.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${auth.getAccessToken()}`;
    console.log(config);

    return config;
});

export default http;
