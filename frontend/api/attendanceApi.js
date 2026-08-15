import api from "./axios.js";
const route = '/attendance';

export function updateAttendance(attendanceChanges,semId)
{
    return api.patch(`${route}/update/${semId}`,attendanceChanges);
}

export function getCourseSummary(semId)
{
    return api.get(`${route}/get/course-summary/${semId}`);
}

export function planYourBunks(semId)
{
    return api.get(`${route}/get/plan-your-bunks/${semId}`);
}

export function getAttendanceRows(date,semId)
{
    return api.get(`${route}/get/${semId}/${date}`);
}