import "./GradeBox.css";
import { ViewButton } from "./ViewButton";
import { GradeCourse } from "./GradeCourse";

export function GradeBox() {
    return (
        <div className="semester-grade-card">

            <div className="semester-grade-top">

                <div className="semester-info">
                    <div className="semester-name">
                        Semester 1
                    </div>

                    <div className="semester-label">
                        Semester GPA
                    </div>
                </div>

                <div className="sgpa-box">
                    <span>9.04</span>
                    <small>SGPA</small>
                </div>

            </div>

            <ViewButton
                message="View Course Wise"
                component={GradeCourse}
            />

        </div>
    );
}