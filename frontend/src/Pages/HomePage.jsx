import "./HomePage.css";
import { ButtonLogin } from "../Components/login/ButtonLogin";
import { SemesterBox } from "../Components/home/SemesterBox";
import { useState, useEffect } from "react";
import {getSemesters, deleteSemester} from "../../api/semesterApi";
import PageLoader from "../Components/Loader";
import {useNavigate} from "react-router";
import formatDate from "../Utils/FormatDate";
import {useSemester} from "../context/useSemester.js"; 
import { NavBar } from "../Components/navbar.jsx";
export function HomePage()
{
    const [semesters,setSemesters]=useState();
    const [error, setError] = useState('');
    const [showLoader, setShowLoader] = useState(true);
    const navigate = useNavigate();
    const {setSemesterDetails} = useSemester();

    async function onClickTrash(semId)
    {
        await deleteSemester(semId);
        const currentSemesters = [...semesters];
        setSemesters(currentSemesters.filter((semester)=>{
            return semester.semId!=semId;
        }));
    }

    function selectSemester(semester)
    {
        //localStorage.setItem('semId',semester.semId);
        setSemesterDetails(semester);
        navigate(`/dashboard/${semester.semId}`);
    }

    useEffect(()=>{
        async function loadSemesters()
        {
            try{
                const response = await getSemesters();
                setSemesters(response.data.semesters);
            }

            catch(err){
                setError(err.response?.data?.message);
            }

            finally{
                setShowLoader(false);
            }
    }

    loadSemesters();
    },[]);
    return(
        <div>
        <NavBar />
        <div className="div-homepage">
        {showLoader&&<PageLoader/>}
        {!showLoader&& <div className="div-all-semesters">
            <div> Your Semesters</div>
            {semesters&&semesters.map(semester=>{
                return(<div key={semester.semId} onClick={()=>{selectSemester(semester)}}>
                <SemesterBox name={semester.semName}
                    from={formatDate(semester.startDate)}
                    to={formatDate(semester.endDate)}
                    onClick={()=>{onClickTrash(semester.semId)}}
                    />
                </div>)
            })}
            <ButtonLogin text="Add Semester"
                 onClick={()=>{navigate('/add-semester')}}/>
        </div>}
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        </div>
        </div>
    )
}