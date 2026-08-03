import Semester from "../models/semesterModel.js";
import Schedule from "../models/scheduleModel.js";
import Course from "../models/courseModel.js";
import Calendar from "../models/calendarModel.js";
import Attendance from "../models/attendanceModel.js";
import mydb from "../config/database.js";

export async function addSemesterController(req,res)
{
    const connection = await mydb.getConnection();
    await connection.beginTransaction();
    const userId = req.user.userId;
    const params = {userId: userId, semName: req.body.semName, 
        startDate : req.body.startDate, endDate : req.body.endDate,connection
    };
    try{
        const semId = await Semester.addSemester(params);
        const courses = req.body.courses;
        const courseMap = await Course.addCourses({connection,semId,courses});
        await Schedule.addSchedule({connection,semId,courseMap});
        await Calendar.addCalendar({connection,semId,list: req.body.holidays,code: 1});
        await Calendar.addCalendar({connection,semId,list: req.body.exams,code: 2});
        await Calendar.addSaturdays({connection,semId,saturdays: req.body.saturdays});
        await Attendance.generateAttendance({connection,semId,fromDate: req.body.startDate,toDate:req.body.endDate});
        await connection.commit();
        return res.status(201).json({message: 'Semester Added successfully'});
    }
    catch(err){
        await connection.rollback();
        return res.status(500).json({message: err.message});
    }
    finally{
        connection.release();
    }
}

export async function deleteSemesterController(req,res)
{
    const userId = req.user.userId;
    const semId = req.params.semId;
    try{
        const result = await Semester.deleteSemester({userId,semId});
        if(result.affectedRows === 0)
        {
            return res.status(403).json({message: 'Action Not allowed!!'});
        }
        return res.status(200).json({message: 'Semester Deleted Successfully!'})
    }
    catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}
