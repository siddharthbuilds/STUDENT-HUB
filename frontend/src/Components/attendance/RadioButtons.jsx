import "./RadioButtons.css"
export function RadioButtons({months})
{
    return(
        <div className="div-attendance-months">
            {months.map(month=>{
                return <button className="btn-attendance-months">
                    <input type="radio"
                    name="input-month" 
                    className="input-month-radio" 
                    id={`month-${month}`}
                    value={`${month}`}/>
                    <label htmlFor={`month-${month}`}> {`${month}`} </label>
                </button>
            })}
                
        </div>
    )
}