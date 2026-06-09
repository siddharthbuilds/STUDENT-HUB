import "./GradeBox.css"
// import { useState } from "react"
import { CGPACircle } from "./CGPACirle"
import { ViewButton } from "./ViewButton"
import { GradeCourse } from "./GradeCourse"
export function GradeBox(){
    // const [viewButton,setViewButton] = useState(false);
    // // function toggleViewButton(){
    // //     setViewButton(!viewButton);
    // // }
    return(
        <>
        <div className="div-grades-container">
            <div className="div-grades-box">
                <div className="div-grades-sem-sgp">
                    <div className="div-grades-sem">
                        Semester 1
                    </div>
                    <div className="div-grades-sgp">
                        <CGPACircle cgpa="9.04" />
                    </div>
                </div>
                
                {/* <div className="div-viewdetails">
                    <button className="btn-viewdetails" 
                    onClick={()=>{
                        toggleViewButton();
                    }}>
                        <div>View Details </div>
                        <div>
                           <img src={viewButton?dropupImage:dropdownImage} 
                        className="img-dropdown"/>  
                        </div>
                    </button>
                </div>
                {viewButton&&<div className="div-grades-details">
                    <div className="div-grades-course">
                        <div className="div-grades-coursename">Problem Solving And Programming In C</div>
                        <div className="div-grades-coursegrade">S</div>
                    </div>
                </div>} */}
                <ViewButton message="View Course Wise" component={GradeCourse}/>

            </div>
        </div>
        </>
    )
}