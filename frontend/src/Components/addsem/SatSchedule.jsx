import "./SatSchedule.css"
import { SatBox } from "./SatBox"
const satDates=['12-12-12'];
export function SatSchedule()
{
    
    return(
        <>
        <div className="div-sat-header">
            Saturdays
        </div>

        <div className="div-sat-body-container">
            {satDates.map(date=>{return(<>
                <SatBox date={date} />
            </>)})}
        </div>
        </>
    )
}