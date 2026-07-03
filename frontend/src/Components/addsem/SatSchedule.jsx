import "./SatSchedule.css"
import { SatBox } from "./SatBox"
export function SatSchedule({satDates})
{
    
    return(
        <>
        <div className="div-sat-header">
            Saturdays
        </div>

        <div className="div-sat-body-container">
            {satDates.map((date)=>{return(<div key={date.day}>
                <SatBox date={`${date.day}-${date.month}-${date.year}`} />
            </div>)})}
        </div>
        </>
    )
}