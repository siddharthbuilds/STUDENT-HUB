import "./AttendanceDetails.css"
import { ProgressBar } from "./ProgressBar"
export function AttendanceDetails({course,total=0,present,absent,bunks,percentage=0.0}){
    return(
        <div className="div-attendance-overall">
                            <div className="div-attendance-course">
                                <div> {course} </div>
                                <div> {`${isNaN(percentage)?0:percentage}%`} </div>
                            </div>
                            <ProgressBar width={isNaN(percentage)?0:percentage} />
                            <div className="div-attendance-details">
                                <div className="div-attendance-subdetails">
                                    <div> Total Hours </div>
                                    <div> {total}</div>
                                </div>
                                <div className="div-attendance-subdetails">
                                    <div> Hours Present </div>
                                    <div> {present}</div>
                                </div>
                                <div className="div-attendance-subdetails">
                                    <div> Hours Absent </div>
                                    <div> {absent}</div>
                                </div>
                                <div className="div-attendance-subdetails">
                                    <div> Bunks Left </div>
                                    <div className={Number(bunks)>5? "style-safe-bunk"
                                    :Number(bunks)<=5 && Number(bunks)>0? "style-risk-bunk"
                                    :"style-bad-bunk"}>
                                    {bunks}</div>
                                </div>
                            </div>
                        </div>
    )
}