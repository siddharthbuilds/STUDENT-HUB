import "./HomePage.css";
import { Pencil } from "lucide-react";

export function HomePage() {

    // Replace these values with your actual user/API data later
    const user = {
        name: "Siddharth",
        userId: "22CS0000",
        email: "siddharth@example.com",
        cgpa: "9.04",
        attendance: "87%"
    };

    return (
        <div className="home-page">

            <main className="home-content">

                {/* Welcome */}
                <div className="home-welcome">
                    <div className="home-welcome-title">
                        Welcome back, {user.name}
                    </div>

                    <div className="home-welcome-subtitle">
                        Here's your academic overview
                    </div>
                </div>


                {/* User Details */}
                <section className="user-details-card">

                    <div className="user-detail-row">
                        <div className="user-detail-label">
                            User Name
                        </div>

                        <div className="user-detail-value">
                            <span>{user.name}</span>

                            <button className="edit-button">
                                <Pencil size={15} />
                            </button>
                        </div>
                    </div>


                    <div className="user-detail-row">
                        <div className="user-detail-label">
                            User ID
                        </div>

                        <div className="user-detail-value">
                            {user.userId}
                        </div>
                    </div>


                    <div className="user-detail-row">
                        <div className="user-detail-label">
                            Email
                        </div>

                        <div className="user-detail-value">
                            <span>{user.email}</span>

                            <button className="edit-button">
                                <Pencil size={15} />
                            </button>
                        </div>
                    </div>

                </section>


                {/* Academic Overview */}
                <section className="academic-overview">

                    {/* CGPA */}
                    <div className="academic-card">

                        <div className="academic-card-heading">
                            Overall CGPA
                        </div>

                        <div className="academic-card-content">
                            <div className="academic-number">
                                {user.cgpa}
                            </div>

                            <div className="academic-description">
                                Overall academic performance
                            </div>
                        </div>

                    </div>


                    {/* Attendance */}
                    <div className="academic-card">

                        <div className="academic-card-heading">
                            Current Semester
                        </div>

                        <div className="attendance-content">

                            <div className="attendance-circle">
                                <div className="attendance-circle-inner">
                                    {user.attendance}
                                </div>
                            </div>

                            <div className="attendance-text">
                                <div className="attendance-title">
                                    Overall Attendance
                                </div>

                                <div className="attendance-description">
                                    Current semester attendance
                                </div>
                            </div>

                        </div>

                    </div>

                </section>


                {/* Small bottom information area */}
                <div className="home-footer-message">
                    Keep track of your academics from one place.
                </div>

            </main>

        </div>
    );
}