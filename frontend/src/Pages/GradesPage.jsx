import "./GradesPage.css";
import { OverallGradeBox } from "../Components/grades/OverallGradeBox";
import { ButtonLogin } from "../Components/login/ButtonLogin";

export function GradesPage() {
    return (
        <div className="grades-page">

            <main className="grades-main">
                <OverallGradeBox />
            </main>
            <div style={{display:"flex", justifyContent:"center"}}>
                <ButtonLogin text="+ Add / Edit your Grades"/>
            </div>
        </div>
    );
}