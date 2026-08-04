import api from "./axios.js";
const route = '/semesters';

export function addSemester(data)
{
    return api.post(`${route}/add`,data);
}

export function deleteSemester(semId)
{
    return api.delete(`${route}/delete/${semId}`);
}