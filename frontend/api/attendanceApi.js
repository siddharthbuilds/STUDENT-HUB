import api from "./axios.js";
const route = '/attendance';

export function updateAttendance(attendanceChanges)
{
    return api.patch(`${route}/update`,attendanceChanges);
}

export function getCourseSummary()
{
    return api.get(`${route}/get/course-summary`);
}

export function planYourBunks()
{
    return api.get(`${route}/get/plan-your-bunks/`);
}

export function getAttendanceRows(date)
{
    return api.get(`${route}/get/${date}`);
}