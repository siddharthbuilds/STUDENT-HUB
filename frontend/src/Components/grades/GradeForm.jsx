import { useState } from "react";
import "./GradeForm.css";
import { updateGrades } from "../../../api/gradeApi.js";

export function GradeForm({ semesters, onClose, onSave}) {

    const [error, setError] = useState('');
    const [selectedSemId, setSelectedSemId] = useState("");
    const [grades, setGrades] = useState({});

    const selectedSemester = semesters?.find(
        sem => {if (String(sem.courses[0].semId) === String(selectedSemId))
        {
            return true;
        }
        }
    );

    const handleGradeChange = (gradeId, grade) => {
        setGrades(prev => ({
            ...prev,
            [gradeId]: grade
        }));
    };

    async function  handleSave () {

        if (!selectedSemId) {
            alert("Please select a semester.");
            return;
        }
        try{

            await updateGrades({gradeChanges:grades});
            onSave();
        }

        catch(error)
        {
            setError(error.message);
        }
        
    };

    return (
        <div className="grade-form-overlay">

            <div className="grade-form">

                <div className="grade-form-header">

                    <div>
                        <h2>Add / Edit Grades</h2>
                        <p>Select your semester and enter your grades</p>
                    </div>

                    <button
                        className="grade-form-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <div className="semester-selection">

                    <label>Select Semester</label>

                    <select
                        value={selectedSemId}
                        onChange={(e) => {
                            setSelectedSemId(e.target.value);
                            setGrades({});
                        }}
                    >
                        <option value="">
                            -- Select Semester --
                        </option>

                        {semesters?.map(semester => (
                            <option
                                key={semester.courses[0].semId}
                                value={semester.courses[0].semId}
                            >
                                {semester.courses[0].semName}
                            </option>
                        ))}

                    </select>

                </div>

                {selectedSemester && (

                    <div className="grade-courses">

                        <div className="courses-heading">
                            <span>Course</span>
                            <span>Grade</span>
                        </div>

                        {selectedSemester.courses.map(course => (

                            <div
                                className="grade-course-row"
                                key={course.gradeId}
                            >

                                <div className="course-details">

                                    <span className="course-name">
                                        {course.courseName}
                                    </span>

                                    <span className="course-credit">
                                        {course.courseCredits} Credits
                                    </span>

                                </div>


                                <div className="grade-options">

                                    {["S","A+","A", "B", "C", "D"].map(
                                        grade => (

                                            <button
                                                key={grade}
                                                type="button"
                                                className={
                                                    Object.hasOwn(grades,course.gradeId)?
                                                    grades[course.gradeId]===grade
                                                    ?"grade-option selected"
                                                    : "grade-option"
                                                    :course.grade === grade
                                                        ? "grade-option selected"
                                                        : "grade-option"
                                                }
                                                onClick={() =>
                                                    handleGradeChange(
                                                        course.gradeId,
                                                        grade
                                                    )
                                                }
                                            >
                                                {grade}
                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                <div className="grade-form-actions">

                    <button
                        className="grade-cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="grade-save-btn"
                        onClick={handleSave}
                    >
                        Save Grades
                    </button>

                </div>

            </div>

            {error && <p className="attendance-error">{error}</p>}

        </div>
    );
}