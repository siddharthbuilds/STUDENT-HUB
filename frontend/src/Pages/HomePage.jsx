import "./HomePage.css";
import { ButtonLogin } from "../Components/login/ButtonLogin";
import { SemesterBox } from "../Components/home/SemesterBox";
import { useState, useEffect } from "react";
import {getSemesters} from "../../api/semesterApi";
import PageLoader from "../Components/Loader";
export function HomePage()
{
    const [semesters,setSemesters]=useState();
    const [error, setError] = useState('');
    const [showLoader, setShowLoader] = useState(true);
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
                    from={semester.startDate}
                    to={semester.toDate}
                    />
                </>)
            })}
            <ButtonLogin text="Add Semester" />
        </div>}
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        </>
    )
}