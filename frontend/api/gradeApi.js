import api from "./axios.js";
const route = '/grades';

export function getGrades()
{
    return api.get(`${route}/get`);
}
