import User from "../models/userModel.js"
import Attendance from "../models/attendanceModel.js";
import Semester from "../models/semesterModel.js";

export async function userDetailsController(req,res)
{
    try{

        const userId = req.user.userId;
        const userDetails = await User.getUserDetails({userId});
        userDetails.userId = req.user.userId;

        const currentSemester = await Semester.getCurrentSemester({userId});
        if(currentSemester)
        {
            const semId = currentSemester.semId;
            const statusList = await Attendance.currentAttendance({semId});
            const total=statusList&&statusList.length;
            let present=0;
            statusList.forEach(({status})=>{
                if(status===1) present+=1;
            });
            userDetails.attendance = total!=0 ? +((present/total)*100).toFixed(2):0;
        }
        else {userDetails.attendance=0;}
        return res.status(200).json({userDetails});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}