import Grade from "../models/gradesModel.js";
import mydb from "../config/database.js";

const gradePointMap = new Map();
const grades=['S','A+','A','B','C','D'];
let index=10;
grades.forEach(grade=>{
    gradePointMap.set(grade,index);
    index-=1;
});
gradePointMap.set('Y',0);

export async function getGradesController(req,res)
{
    const userId = req.user.userId;
    try{
        const userGrades = await Grade.getGrades({userId});
        let totalCredits=0;
        userGrades.forEach(grade=>{totalCredits+=grade.courseCredits});
        let totalPoints=0;
        userGrades.forEach(grade=>{
            totalPoints+=(gradePointMap.get(grade.grade)*grade.courseCredits);
        });
        const cgpa=totalCredits>0 && +(totalPoints/totalCredits).toFixed(2);
        const grouped = {};
        userGrades.forEach(grade=>{
            if(!grouped[grade.semId])
            {
                grouped[grade.semId] = {courses:[],sgpa:0}
            }
            grouped[grade.semId].courses.push(grade);
        });
        const courseList = Object.values(grouped);
        courseList.forEach(({courses})=>{
            let semesterCredits=0;
            let semesterPoints=0;
            courses.forEach(c=>{
                semesterCredits+=c.courseCredits;
                semesterPoints+=gradePointMap.get(c.grade)*c.courseCredits;
            });
            grouped[courses[0].semId].sgpa = semesterCredits>0&& +(semesterPoints/semesterCredits).toFixed(2);
        });
        return res.status(200).json({
            grades: {cgpa,semesters:grouped}
        })
    }
    catch(err)
    {
        return res.status(500).json({message:err.message})
    }
}

export async function updateGradesController(req,res)
{
    const connection = await mydb.getConnection();
    await connection.beginTransaction();
    try{
        const gradeChanges = req.body.gradeChanges;
        const insertData=[];
        const changes = Object.entries(gradeChanges);
        changes.forEach(([id,grade])=>{
            insertData.push(grade,id);
        });
        await Grade.updateGrades({insertData,connection});
        await connection.commit();
        return res.status(200).json({message:"Grades Updated!"});
    }
    catch(err)
    {
        await connection.rollback();
        return res.status(500).json({message: err.message});
    }
    finally{
        await connection.release();
    }
}