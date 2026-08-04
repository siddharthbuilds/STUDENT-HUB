import Attendance from "../models/attendanceModel.js";
import Calendar from "../models/calendarModel.js";
import mydb from "../config/database.js";
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
    const connection = await mydb.getConnection();
    await connection.beginTransaction();
    const attendanceChanges = req.body.attendanceChanges;
    try
    {
        await Attendance.updateAttendance({attendanceChanges,connection});
        await connection.commit();
        return res.status(200).json({message: "Attendance Updated!"});
    }
    catch(err)
    {
        await connection.rollback();
        return res.status(500).json({message: err.message});
    }
    finally
    {
        await connection.release();
    }
}

export async function courseSummaryController(req,res)
{
    const semId = req.params.semId;
    try{
        const courseSummary = await Attendance.getCourseSummary({semId});
        return res.status(200).json({courseSummary});
    }
    catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}

export async function planYourBunksController(req,res)
{
    const semId = req.params.semId;
    try{
        const attendanceRows = await Attendance.planYourBunks({semId});
        if(attendanceRows.length>0) 
        {
            return res.status(200).json({attendanceRows});
        }
        else{
            return res.status(400).json({message:'Semester Not found'});
        }
    }
    catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}