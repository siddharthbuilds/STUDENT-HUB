import Attendance from "../models/attendanceModel.js";
import Calendar from "../models/calendarModel.js";
export async function getAttendanceController(req,res)
{
    const semId = req.body.semId;
    const attendanceDate = req.params.date;
    try{
        let attendanceRows = await Calendar.getCalendar({semId, attendanceDate});
        if(attendanceRows.length>0)
        {
            return res.status(200).json({attendanceRows, type: 0});
        }
        else
        {
            attendanceRows = await Attendance.getAttendance({semId, attendanceDate});
            return res.status(200).json({attendanceRows, type:1});
        }
    }
    catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}

export async function updateAttendanceController(req,res)
{
    const attendanceId = parseInt(req.params.attendanceId);
    try
    {
        const status = await Attendance.updateAttendance({attendanceId});
        return res.status(200).json({status});
    }
    catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}