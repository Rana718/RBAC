import axios from "axios";


const API_URL = "http://127.0.0.1:5000";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});