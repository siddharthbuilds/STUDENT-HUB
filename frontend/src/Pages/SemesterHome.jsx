import "./SemesterHome.css";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Check } from "lucide-react";
import {useSemester} from "../context/useSemester.js";
import {getSemesterSummary} from "../../api/semesterApi.js";
import formatDate from "../Utils/FormatDate.js";

export function SemesterHome() {
    const {semesterDetails} = useSemester();
    const [semSummary,setSemSummary] = useState(null);
    useEffect(()=>{
        async function semSummary()
        {
            const response = await getSemesterSummary(semesterDetails.semId);
            setSemSummary(response.data); 
        }
        semSummary();
    },[])
    const navigate = useNavigate();

    const [showCourses, setShowCourses] = useState(false);
    const startDate = new Date (semesterDetails.startDate);
    const endDate = new Date(semesterDetails.endDate);

    return (
        <div className="semester-home">
            {semSummary&&semesterDetails&&
                 <main className="semester-home-content">

                <div className="semester-home-header">
                    <div>
                        <div className="semester-home-title">
                            {semesterDetails.semName}
                        </div>

                        <div className="semester-home-subtitle">
                            {formatDate(startDate.toLocaleDateString('en-CA'))} 
                                — 
                                {formatDate(endDate.toLocaleDateString('en-CA'))}
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
                                        {semSummary.courses.length}
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
                                    {semSummary.courses.map((course) => (
                                        <div
                                            className="course-item"
                                            key={course.courseId}
                                        >
                                            <div className="course-item-list">

                                            <div>
                                            <span className="course-name">
                                                {course.courseName}
                                            </span>
                                            </div>

                                            <div>
                                           <span className="course-credits">
                                                {course.courseCredits}
                                            </span>
                                            </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="semester-detail">
                            <span className="semester-detail-label">
                                Credits
                            </span>

                            <span className="semester-detail-value">
                                {semSummary.totalCredits}
                            </span>
                        </div>


                        <div className="semester-detail">
                            <span className="semester-detail-label">
                                Total Hours
                            </span>

                            <span className="semester-detail-value">
                                {semSummary.totalHours}
                            </span>
                        </div>

                    </div>

                </section>


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
            }
           
        </div>
    );
}