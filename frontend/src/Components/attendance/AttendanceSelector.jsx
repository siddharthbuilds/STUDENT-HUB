import "./AttendanceSelector.css"
export function AttendanceSelector({dayWise,styleDayWise,courseWise,styleCourseWise}){
    return(
        <div className="div-attendance-pages">
                <div className={dayWise? "div-attendance-page style-clicked"
                    :"div-attendance-page"
                } onClick={styleDayWise}>
                    <div>Day-Wise</div>
                </div>
                <div className={courseWise? "div-attendance-page style-clicked"
                    :"div-attendance-page"
                } onClick={styleCourseWise}>
                    <div> Course-Wise </div>
                </div>
            </div>
    )
}

