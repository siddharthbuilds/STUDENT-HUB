import "./GradeBox.css";
import { ViewButton } from "./ViewButton";
import { GradeCourse } from "./GradeCourse";

export function GradeBox({semester}) {
    return (
        <div className="semester-grade-card">

            <div className="semester-grade-top">

                <div className="semester-info">
                    <div className="semester-name">
                        {semester.courses[0].semName}
                    </div>

                    <div className="semester-label">
                        Semester GPA
                    </div>
                </div>

                <div className="sgpa-box">
                    <span>{semester.sgpa}</span>
                    <small>SGPA</small>
                </div>

            </div>

            <ViewButton
                message="View Course Wise"
                component={GradeCourse}
                data={semester.courses}
            />

        </div>
    );
}