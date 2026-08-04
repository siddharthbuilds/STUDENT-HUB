import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api"
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