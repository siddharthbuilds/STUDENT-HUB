import "./GradesPage.css";
import { OverallGradeBox } from "../Components/grades/OverallGradeBox";
import { ButtonLogin } from "../Components/login/ButtonLogin";
import { getGrades } from "../../api/gradeApi";
import { useEffect, useState} from "react";


export function GradesPage() {
    const [grades,setGrades] = useState(null);
    useEffect(()=>{
    async function fetchGrades()
    {
        const response = await getGrades();
        setGrades(response.data.grades);
    }
    fetchGrades();
},[])
    return (
        <div className="grades-page">

            <main className="grades-main">
                <OverallGradeBox grades={grades}/>
            </main>
            <div style={{display:"flex", justifyContent:"center"}}>
                <ButtonLogin text="+ Add / Edit your Grades"/>
            </div>
        </div>
    );
}