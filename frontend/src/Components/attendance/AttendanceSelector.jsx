import "./AttendanceSelector.css"
export function AttendanceSelector({dayWise,styleDayWise,styleCourseWise}){
    return(
        <div className="div-attendance-pages">

                <div
                className={
                    dayWise
                    ? "div-slider"
                    : "div-slider div-slider-right"
                }>
                </div>

                <div className="div-attendance-page" 
                onClick={styleDayWise}>
                    <div>Day-Wise</div>
                
                </div>

                <div className="div-attendance-page"
                onClick={styleCourseWise}>
                    <div> Course-Wise </div>
                </div>
            </div>
    )
}

