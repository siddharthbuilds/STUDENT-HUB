import Semester from "../models/semesterModel.js"

async function removeSemestersController(req,res)
{
    const semId = req.body.semId;
    try{
        await Semester.removeSemester(semId); 
        return res.status(200).json({message: "Semester Removed!"});  
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

export default removeSemestersController