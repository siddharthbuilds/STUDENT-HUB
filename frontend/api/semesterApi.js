import api from "./axios.js";
const route = '/semesters';

export function addSemester(data)
{
    return api.post(`${route}/add`,data);
}

export function getSemesters()
{
    return api.get(`${route}`);
}

export function deleteSemester(semId)
{
    return api.delete(`${route}/delete/${semId}`);
}

export function getSemesterSummary(semId)
{
    return api.get(`${route}/sem-summary/${semId}`)
}