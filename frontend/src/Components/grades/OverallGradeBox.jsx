import "./OverallGradeBox.css";
import { CGPACircle } from "./CGPACirle";
import { GradeBox } from "./GradeBox";
import { Fragment } from "react";

export function OverallGradeBox({grades}) {
    const semList = grades&&Object.values(grades.semesters);
    return (
        <div className="overall-grades-wrapper">

            <section className="overall-grade-card">
                <div className="overall-grade-content">
                    <div>
                        <div className="overall-label">
                            Overall CGPA
                        </div>

                        <div className="overall-subtitle">
                            Your academic performance
                        </div>
                    </div>

                    <CGPACircle cgpa={grades&&grades.cgpa} />
                </div>
            </section>

            <section className="semester-grades-section">
                <div className="section-heading">
                    Semester Performance
                </div>

                <div className="semester-grades-list">
                    {semList&&semList.map(semester=>{
                        return(<Fragment key={semester.courses[0].semId}>
                            <GradeBox semester={semester}/>
                        </Fragment>)
                    })}
                    
                </div>
            </section>

        </div>
    );
}