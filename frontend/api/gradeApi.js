import api from "./axios.js";
const route = '/grades';

export function getGrades()
{
    return api.get(`${route}/get`);
}

export function updateGrades({gradeChanges})
{
    return api.patch(`${route}/update`,{gradeChanges})
}
