import Semester from "../models/semesterModel.js";

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
        const courseMap = await Semester.addCourses({connection,semId,courses});
        await Semester.addSchedule({connection,semId,courseMap});
        await Semester.addCalendar({connection,semId,list: req.body.holidays,code: 1});
        await Semester.addCalendar({connection,semId,list: req.body.exams,code: 2});
        await Semester.addSaturdays({connection,semId,saturdays: req.body.saturdays});
        await Semester.generateAttendance({connection,semId,fromDate: req.body.startDate,toDate:req.body.endDate});
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
