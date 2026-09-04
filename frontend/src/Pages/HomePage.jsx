import "./HomePage.css";
import { Pencil } from "lucide-react";
import { userDetails } from "../../api/authApi";
import { getGrades } from "../../api/gradeApi";

import { useEffect, useState } from "react";

export function HomePage() {
    const [user,setUser] = useState(null);
    const [cgpa,setCgpa] = useState(null);
    const [error, setError] = useState('');
    useEffect(()=>{
        async function getUserDetails()
        {
            try{
                const response = await userDetails();
                setUser(response.data.userDetails);
                const gradeReponse = await getGrades();
                const {cgpa} = gradeReponse.data.grades;
                setCgpa(cgpa);
            }
            catch(error)
            {
                setError(error.response?.data?.message)
            }
        }
        getUserDetails();
    },[]);
    const angle = user&& (user.attendance/100)*360;

    return (
        <div className="home-page">
            {user&&
                <main className="home-content">

                <div className="home-welcome">
                    <div className="home-welcome-title">
                        Welcome back, {user.userName}
                    </div>

                    <div className="home-welcome-subtitle">
                        Here's your academic overview
                    </div>
                </div>


                <section className="user-details-card">

                    <div className="user-detail-row">
                        <div className="user-detail-label">
                            User Name
                        </div>

                        <div className="user-detail-value">
                            <span>{user.userName}</span>

                            {/* <button className="edit-button">
                                <Pencil size={15} />
                            </button> */}
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

                            {/* <button className="edit-button">
                                <Pencil size={15} />
                            </button> */}
                        </div>
                    </div>

                </section>


                <section className="academic-overview">

                    <div className="academic-card">

                        <div className="academic-card-heading">
                            Overall CGPA
                        </div>

                        <div className="academic-card-content">
                            <div className="academic-number">
                                {cgpa}
                            </div>

                            <div className="academic-description">
                                Overall academic performance
                            </div>
                        </div>

                    </div>

                    <div className="academic-card">

                        <div className="academic-card-heading">
                            Current Semester
                        </div>

                        <div className="attendance-content">

                            <div className="attendance-circle" 
                                style={{ background: `conic-gradient(
                                            cyan 0deg ${angle}deg,
                                            rgba(255, 255, 255, 0.1) ${angle}deg 360deg
                                            )`}}
                            
                            >
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


                <div className="home-footer-message">
                    Keep track of your academics from one place.
                </div>

            </main>

            }
            
            {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        </div>
    );
}