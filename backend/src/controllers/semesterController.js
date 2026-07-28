import Semester from "../models/semesterModel.js"
export async function addSemesterController(req,res)
{
    const userId = req.user.userId;
    const params = {userId: userId, semName: req.body.semName, 
        startDate : req.body.startDate, endDate : req.body.endDate
    };
    try{
        const semId = await Semester.addSemester(params);
        return res.status(201).json({message: 'Semester Added successfully'});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
    
}