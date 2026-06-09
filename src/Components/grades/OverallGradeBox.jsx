import "./GradeBox.css"
import { ProgressBar } from "../attendance/ProgressBar"
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
                        9.04
                    </div>
                </div>
                <ProgressBar width="90.4" />
            </div>
        </div>
        </>
    )
}
