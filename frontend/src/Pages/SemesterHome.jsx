import "./SemesterHome.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Check } from "lucide-react";

export function SemesterHome() {
    const navigate = useNavigate();

    const [showCourses, setShowCourses] = useState(false);

    const semester = {
        name: "Semester 6",
        startDate: "Sep 1, 2026",
        endDate: "Sep 30, 2026",
        courses: [
            "Java Programming",
            "Data Structures",
            "Digital System Design",
            "Computer Organization",
            "Engineering Mathematics",
            "Database Management Systems"
        ],
        credits: 22,
        workingDays: 24
    };

    return (
        <div className="semester-home">
            <main className="semester-home-content">

                <div className="semester-home-header">
                    <div>
                        <div className="semester-home-title">
                            {semester.name}
                        </div>

                        <div className="semester-home-subtitle">
                            {semester.startDate} — {semester.endDate}
                        </div>
                    </div>
                </div>


                <section className="semester-details-card">

                    <div className="semester-details-heading">
                        Semester Details
                    </div>

                    <div className="semester-details-grid">

                        <div
                            className={
                                showCourses
                                    ? "semester-detail courses-detail courses-open"
                                    : "semester-detail courses-detail"
                            }
                            onClick={() => setShowCourses(!showCourses)}
                        >
                            <div className="courses-detail-header">
                                <div className="courses-detail-title">
                                    <span className="semester-detail-label">
                                        Courses
                                    </span>

                                    <span className="semester-detail-value">
                                        {semester.courses.length}
                                    </span>
                                </div>

                                <ChevronDown
                                    size={20}
                                    className={
                                        showCourses
                                            ? "courses-arrow arrow-open"
                                            : "courses-arrow"
                                    }
                                />
                            </div>

                            {showCourses && (
                                <div className="courses-list">
                                    {semester.courses.map((course, index) => (
                                        <div
                                            className="course-item"
                                            key={course}
                                        >
                                            <div className="course-item-list">

                                            <div>
                                            <span className="course-name">
                                                {course}
                                            </span>
                                            </div>

                                            <div>
                                           <span className="course-credits">
                                                {index + 1}
                                            </span>
                                            </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/* Credits */}
                        <div className="semester-detail">
                            <span className="semester-detail-label">
                                Credits
                            </span>

                            <span className="semester-detail-value">
                                {semester.credits}
                            </span>
                        </div>


                        {/* Working Days */}
                        <div className="semester-detail">
                            <span className="semester-detail-label">
                                Working Days
                            </span>

                            <span className="semester-detail-value">
                                {semester.workingDays}
                            </span>
                        </div>

                    </div>

                </section>


                {/* Semester Features */}
                <section className="semester-options-section">

                    <div className="semester-options-heading">
                        What would you like to view?
                    </div>

                    <div className="semester-options">

                        <button
                            className="semester-option-card"
                            onClick={() => navigate("/user/semesters/attendance")}
                        >
                            <div className="semester-option-icon">
                                <Check size={25} />
                            </div>

                            <div className="semester-option-content">
                                <div className="semester-option-title">
                                    Attendance
                                </div>

                                <div className="semester-option-description">
                                    View and update your daily attendance
                                </div>
                            </div>

                            <div className="semester-option-arrow">
                                →
                            </div>
                        </button>


                        <button
                            className="semester-option-card"
                            onClick={() => navigate("/user/semesters/planner")}
                        >
                            <div className="semester-option-icon planner-icon">
                                ◷
                            </div>

                            <div className="semester-option-content">
                                <div className="semester-option-title">
                                    Plan Your Bunks
                                </div>

                                <div className="semester-option-description">
                                    Plan your absences and check your limits
                                </div>
                            </div>

                            <div className="semester-option-arrow">
                                →
                            </div>
                        </button>

                    </div>

                </section>

            </main>
        </div>
    );
}