import "./SatSchedule.css"
import { SatBox } from "./SatBox"
export function SatSchedule({satDates,setSatDates})
{

    function addStatus(uuid,option,order)
    {
        setSatDates(satDates.map((saturday)=>{
                if(saturday.uuid===uuid)
                {
                    if(option=='Class')
                    {
                        return {
                            uuid: uuid,
                            status:1,
                            order:order
                        }
                    }
                    else (option=="Holiday")
                    {
                        return{
                            uuid: uuid,
                            status:0,
                            order:null
                        }
                    }
                }
                return saturday
            })
        )
    }
    
    return(
        <>
        <div className="div-sat-header">
            Saturdays
        </div>

        <div className="div-sat-body-container">
            {satDates.map((saturday)=>{return(<div key={saturday.uuid}>
                <SatBox date={saturday.displayDate} uuid={saturday.uuid} 
                    addStatus={addStatus}/>
            </div>)})}
        </div>
        </>
    )
}