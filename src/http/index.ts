import axios , { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:8000/api/v2/'
};

const http = axios.create(axiosConfig);

export default http