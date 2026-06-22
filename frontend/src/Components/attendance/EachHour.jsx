import "./EachHour.css"
export function EachHour()
{
    return(
        <div className="div-attendace-hours">
                <div className="div-attendance-eachhour">
                    <div className="div-attendance-hourname">
                        Python for Beginners
                    </div>
                    <div className="div-attendance-hourstatus">
                        <button className="btn-attendance-hourstatus"></button>
                    </div>
                </div>
                <div className="div-attendance-eachhour">
                    <div className="div-attendance-hourname">
                        React Beginner Course
                    </div>
                    <div className="div-attendance-hourstatus">
                        <button className="btn-attendance-hourstatus1"></button>
                    </div>
                </div>
            </div>
    )
}