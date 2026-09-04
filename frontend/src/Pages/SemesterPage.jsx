import "./SemesterPage.css";
import { ButtonLogin } from "../Components/login/ButtonLogin.jsx";
import { SemesterBox } from "../Components/home/SemesterBox.jsx";
import { useState, useEffect } from "react";
import { getSemesters, deleteSemester } from "../../api/semesterApi.js";
import PageLoader from "../Components/Loader.jsx";
import { useNavigate } from "react-router";
import formatDate from "../Utils/FormatDate.js";
import { useSemester } from "../context/useSemester.js";
import { ConfirmationBox } from "../Components/attendance/ConfirmationBox.jsx";
import {SemesterHint} from "../Components/home/SemesterHint.jsx";

export function SemesterPage() {
    const [semesters, setSemesters] = useState();
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(true);
    const navigate = useNavigate();
    const { setSemesterDetails } = useSemester();
    const [showConfirmation,setShowConfirmation] = useState(false);
    const [currentSem, setCurrentSem] = useState(null);

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
                                               setCurrentSem(semester.semId)
                                               setShowConfirmation(true); 
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
                    <div>
                        <SemesterHint />
                    </div>
                </div>
            )}

            {showConfirmation&&
            <ConfirmationBox 
                message1="Are you sure want to delete this semester"
                message2="Note: This action cannot be undone!"
                option1="Cancel"
                option2="Delete"
                toastmessage="Semester Deleted"
                saveFunction={()=>{setShowConfirmation(false)}}
                cancelFunction={()=>{onClickTrash(currentSem)}}
                setTrackConfirmation={setShowConfirmation}
            />}

            {error && (
                <p className="semester-error">
                    {error}
                </p>
            )}
        </div>
    );
}