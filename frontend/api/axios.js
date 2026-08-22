import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL
});

api.interceptors.request.use(config=>{
    const token=localStorage.getItem("accessToken");
    const semId =localStorage.getItem("semId");
    if(token)
    {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    if(semId)
    {
        config.headers["x-sem-id"] = semId;
    }
    return config;
});

export default api;