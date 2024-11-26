import axios from "axios";
import { store } from "../redux/store";


const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.admin.token;
        const tokenType = state.admin.tokenType;

        if(token && tokenType) {
            config.headers.Authorization = `${tokenType} ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
