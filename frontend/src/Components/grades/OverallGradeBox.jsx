import "./GradeBox.css"
import { CGPACircle } from "./CGPACirle"
import { ViewButton } from "./ViewButton"
import {GradeBox} from "./GradeBox"
export function OverallGradeBox()
{
    return(
        <>
            <div className="div-grades-container">
            <div className="div-grades-box">
                <div className="div-grades-sem-sgp">
                    <div className="div-grades-sem">
                        Overall
                    </div>
                    <div className="div-grades-sgp">
                        <CGPACircle cgpa="9.04" />
                    </div>
                </div>
            </div>
            <ViewButton message="View Semester Wise" component={GradeBox}/>
        </div>
        </>
    )
}
