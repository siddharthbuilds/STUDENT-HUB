import "./HomePage.css";
import { ButtonLogin } from "../Components/login/ButtonLogin";
import { SemesterBox } from "../Components/home/SemesterBox";
import { useState, useEffect } from "react";
import {getSemesters} from "../../api/semesterApi";
import PageLoader from "../Components/Loader";
import {useNavigate} from "react-router";
import formatDate from "../Utils/FormatDate";
export function HomePage()
{
    const [semesters,setSemesters]=useState();
    const [error, setError] = useState('');
    const [showLoader, setShowLoader] = useState(true);
    const navigate = useNavigate();
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
        <>
        {showLoader&&<PageLoader/>}
        {!showLoader&& <div className="div-all-semesters">
            <div> Your Semesters</div>
            {semesters&&semesters.map(semester=>{
                return(<>
                <SemesterBox name={semester.semName}
                    from={formatDate(semester.startDate)}
                    to={formatDate(semester.endDate)}
                    />
                </>)
            })}
            <ButtonLogin text="Add Semester"
                 onClick={()=>{navigate('/add-semester')}}/>
        </div>}
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        </>
    )
}