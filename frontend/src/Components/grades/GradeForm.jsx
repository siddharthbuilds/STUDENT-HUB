import { useState } from "react";
import "./GradeForm.css";

export function GradeForm({ semesters, onClose, onSave }) {

    const [selectedSemId, setSelectedSemId] = useState("");
    const [grades, setGrades] = useState({});

    const selectedSemester = semesters?.find(
        sem => String(sem.semId) === String(selectedSemId)
    );

    const handleGradeChange = (courseId, grade) => {
        setGrades(prev => ({
            ...prev,
            [courseId]: grade
        }));
    };

    const handleSave = () => {

        if (!selectedSemId) {
            alert("Please select a semester.");
            return;
        }

        const gradeData = selectedSemester.courses.map(course => ({
            semId: selectedSemId,
            courseId: course.courseId,
            grade: grades[course.courseId] || null
        }));

        onSave(gradeData);
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
                                key={semester.semId}
                                value={semester.semId}
                            >
                                {semester.semName}
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
                                key={course.courseId}
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

                                    {["A", "B", "C", "D", "E", "F"].map(
                                        grade => (

                                            <button
                                                key={grade}
                                                type="button"
                                                className={
                                                    grades[course.courseId] === grade
                                                        ? "grade-option selected"
                                                        : "grade-option"
                                                }
                                                onClick={() =>
                                                    handleGradeChange(
                                                        course.courseId,
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

        </div>
    );
}