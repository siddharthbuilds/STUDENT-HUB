import "./RadioButtons.css";
import { DateSelector } from "./DateSelector";
import { useState } from "react";
export function RadioButtons({months, 
                setAttendanceRows, 
                setAttendanceType,
                isDirty, setTrackConfirmation,
                setTrackDirty
            })
{
    const [selectedMonth, setSelectedMonth] = useState(0);
    return(
        <>
        <div className="div-attendance-months">
            {months.map((month,index)=>{
                return (<div key={`${month.month}`}>
                    <button className="btn-attendance-months">
                    <input type="radio"
                    name="input-month" 
                    className="input-month-radio" 
                    id={`month-${month.month}`}
                    value={`${month.month}`}
                    defaultChecked={selectedMonth===index}
                    onClick={()=>{setSelectedMonth(index)}}
                    />
                    <label htmlFor={`month-${month.month}`}> {`${month.month}`} </label>
                </button>
                </div>)
            })}
        </div>
        <DateSelector data={months[selectedMonth]} 
                setAttendanceRows={setAttendanceRows} 
                setAttendanceType={setAttendanceType}
                isDirty={isDirty} setTrackConfirmation={setTrackConfirmation}
                setTrackDirty={setTrackDirty}
                />
        </>
    )
}