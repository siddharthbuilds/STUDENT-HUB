import "./GradesPage.css";
import { OverallGradeBox } from "../Components/grades/OverallGradeBox";
import { ButtonLogin } from "../Components/login/ButtonLogin";
import { getGrades } from "../../api/gradeApi";
import { useEffect, useState} from "react";
import {GradeForm} from "../Components/grades/GradeForm";


export function GradesPage() {
    const [grades,setGrades] = useState(null);
    const [showFrom,setShowForm] = useState(false);

    async function onSave()
    {
        async function fetchGrades()
        {
            const response = await getGrades();
            setGrades(response.data.grades);
        }
            fetchGrades();
        setShowForm(false);
    }

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
                <ButtonLogin 
                    onClick={()=>{setShowForm(true);}}
                    text="+ Add / Edit your Grades"/>
            </div>

            {showFrom&&
                <GradeForm 
                    onClose={()=>{setShowForm(false);}}
                    semesters={Object.values(grades.semesters)}
                    onSave={onSave}
                    />}
        </div>
    );
}