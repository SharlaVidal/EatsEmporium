import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: 'https://localhost:8000/api/v2/'
};

const http = axios.create(axiosConfig);

http.interceptors.request.use(function (config) {
    config.headers['Access-Control-Allow-Origin'] = 'https://eats-emporium-bmzk.vercel.app';
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default http;
