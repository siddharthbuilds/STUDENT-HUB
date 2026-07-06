import "./SatSchedule.css"
import { SatBox } from "./SatBox"
export function SatSchedule({satDates,setSatDates})
{

    function addStatus(uuid,status,order)
    {
        setSatDates(satDates.map(saturday=>{
            if(saturday.uuid===uuid)
            {
                saturday.status=saturday.status==='Class'?1:0;
                saturday.order=saturday.status==='Class'?order:null;
                return saturday;
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
                <SatBox date={saturday.displayDate} uuid={saturday.uuid}
                    addStatus={addStatus} 
                    />
            </div>)})}
        </div>
        </>
    )
}