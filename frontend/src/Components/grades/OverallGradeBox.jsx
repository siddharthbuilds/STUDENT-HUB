import "./OverallGradeBox.css";
import { CGPACircle } from "./CGPACirle";
import { GradeBox } from "./GradeBox";

export function OverallGradeBox() {
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

                    <CGPACircle cgpa="9.04" />
                </div>
            </section>

            <section className="semester-grades-section">
                <div className="section-heading">
                    Semester Performance
                </div>

                <div className="semester-grades-list">
                    <GradeBox />
                    <GradeBox />
                    <GradeBox />
                </div>
            </section>

        </div>
    );
}