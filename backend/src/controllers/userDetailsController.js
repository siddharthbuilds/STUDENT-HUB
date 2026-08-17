import User from "../models/userModel.js"
import Attendance from "../models/attendanceModel.js";
import Semester from "../models/semesterModel.js";

export async function userDetailsController(req,res)
{
    try{

        const userId = req.user.userId;
        const {semId} = await Semester.getCurrentSemester({userId});
        const statusList = await Attendance.currentAttendance({semId});
        const total=statusList&&statusList.length;
        let present=0;
        statusList.forEach(({status})=>{
            if(status===1) present+=1;
        });
        const userDetails = await User.getUserDetails({userId});
        userDetails.userId = req.user.userId;
        userDetails.attendance = +((present/total)*100).toFixed(2);
        return res.status(200).json({userDetails});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}