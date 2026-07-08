import "./SatSchedule.css"
import { SatBox } from "./SatBox"
import formatDate from "../../Utils/FormatDate.js"
export function SatSchedule({satDates,setSatDates})
{

    function addStatus(uuid,status,order)
    {
        setSatDates(satDates.map(saturday=>{
            if(saturday.uuid===uuid)
            {
                return {
                    ...saturday,
                    status: status=='Class'?1:0,
                    order: status=='Class'?order:null
                }
            
            }
            else return saturday;
        }))
    }

    return(
        <>
        <div className="div-sat-header">
            Saturdays
        </div>

        <div className="div-sat-body-container">
            {satDates.map((saturday)=>{return(<div key={saturday.uuid}>
                <SatBox date={formatDate(saturday.date,true)} uuid={saturday.uuid}
                    addStatus={addStatus} 
                    />
            </div>)})}
        </div>
        </>
    )
}