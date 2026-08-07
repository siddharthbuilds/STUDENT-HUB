import "./RadioButtons.css";
import { DateSelector } from "./DateSelector";
import { useState } from "react";
export function RadioButtons({months})
{
    const [selectedMonth, setSelectedMonth] = useState(0);
    return(
        <>
        <div className="div-attendance-months">
            {months.map((month,index)=>{
                return <button className="btn-attendance-months">
                    <input type="radio"
                    name="input-month" 
                    className="input-month-radio" 
                    id={`month-${month.month}`}
                    value={`${month.month}`}
                    checked={selectedMonth===index}
                    onClick={()=>{setSelectedMonth(index)}}
                    />
                    <label htmlFor={`month-${month.month}`}> {`${month.month}`} </label>
                </button>
            })}
        </div>
        <DateSelector data={months[selectedMonth]} />
        </>
    )
}