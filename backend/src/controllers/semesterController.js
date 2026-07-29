import Semester from "../models/semesterModel.js"
export async function addSemesterController(req,res)
{
    const userId = req.user.userId;
    const params = {userId: userId, semName: req.body.semName, 
        startDate : req.body.startDate, endDate : req.body.endDate
    };
    try{
        const semId = await Semester.addSemester(params);
        const courses = req.body.courses;
        const courseMap = await Semester.addCourses(semId,courses);
        await Semester.addSchedule(semId,courseMap);
        await Semester.addCalendar(semId,req.body.holidays,1);
        await Semester.addCalendar(semId,req.body.exams,2);
        await Semester.addSaturdays(semId,req.body.saturdays);
        return res.status(201).json({message: 'Semester Added successfully'});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}
