import api from "./axios.js";
const route = '/users';

export function login(data)
{
    return api.post(`${route}/login`,data);
}

export function register(data)
{
     return api.post(`${route}/register`,data);
}