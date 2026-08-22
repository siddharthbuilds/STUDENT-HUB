import Semester from "../models/semesterModel.js";
export async function verifyUser(req,res,next)
{
    const userId = req.user.userId;
    const semId = req.params.semId;

    try{
        const response = await Semester.verifyUser({userId,semId});
        if(response === 0)
        {
            return res.status(401).json({message:"Semester cannot be accessed!"});
        }
        next();
    }
    catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}