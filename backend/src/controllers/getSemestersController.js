import Semester from "../models/userModel.js"

async function getSemestersController(req,res)
{
    const userId = req.body.userId.replaceAll(" ","").toLowerCase();
    try{
        const semesters = await Semester.getSemesters(userId);
        return res.status(200).json({semesters: semesters});    
    }
    catch(err){
        return res.status(500).json({message: err});
    }
}

export default getSemestersController