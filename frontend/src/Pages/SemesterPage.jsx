import "./SemesterPage.css";
import { ButtonLogin } from "../Components/login/ButtonLogin.jsx";
import { SemesterBox } from "../Components/home/SemesterBox.jsx";
import { useState, useEffect } from "react";
import { getSemesters, deleteSemester } from "../../api/semesterApi.js";
import PageLoader from "../Components/Loader.jsx";
import { useNavigate } from "react-router";
import formatDate from "../Utils/FormatDate.js";
import { useSemester } from "../context/useSemester.js";
import { NavBar } from "../Components/navbar.jsx";

export function SemesterPage() {
    const [semesters, setSemesters] = useState();
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(true);
    const navigate = useNavigate();
    const { setSemesterDetails } = useSemester();

    async function onClickTrash(semId) {
        await deleteSemester(semId);
        const currentSemesters = [...semesters];

        setSemesters(
            currentSemesters.filter((semester) => {
                return semester.semId != semId;
            })
        );
    }

    function selectSemester(semester) {
        //localStorage.setItem('semId',semester.semId);
        setSemesterDetails(semester);
        navigate(`/user/semesters/dashboard`);
    }

    useEffect(() => {
        async function loadSemesters() {
            try {
                const response = await getSemesters();
                setSemesters(response.data.semesters);
            } catch (err) {
                setError(err.response?.data?.message);
            } finally {
                setShowLoader(false);
            }
        }

        loadSemesters();
    }, []);

    return (
        <div className="div-semesterpage">
            {showLoader && <PageLoader />}

            {!showLoader && (
                <div className="div-all-semesters">

                    <div className="semesters-heading">
                        Your Semesters
                    </div>

                    <div className="semester-grid">
                        {semesters &&
                            semesters.map((semester) => {
                                return (
                                    <div
                                        className="semester-item"
                                        key={semester.semId}
                                        onClick={() => {
                                            selectSemester(semester);
                                        }}
                                    >
                                        <SemesterBox
                                            name={semester.semName}
                                            from={formatDate(
                                                semester.startDate
                                            )}
                                            to={formatDate(
                                                semester.endDate
                                            )}
                                            onClick={() => {
                                                onClickTrash(
                                                    semester.semId
                                                );
                                            }}
                                        />
                                    </div>
                                );
                            })}
                    </div>

                    <div className="add-semester-container">
                        <ButtonLogin
                            text="Add Semester"
                            onClick={() => {
                                navigate("/user/add-semester");
                            }}
                        />
                    </div>
                </div>
            )}

            {error && (
                <p className="semester-error">
                    {error}
                </p>
            )}
        </div>
    );
}