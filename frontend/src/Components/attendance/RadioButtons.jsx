import "./RadioButtons.css"
export function RadioButtons()
{
    return(
        <div className="div-attendance-months">
                <button className="btn-attendance-months">
                    <input type="radio"
                    name="input-month" 
                    className="input-month-radio" 
                    id="month-july"
                    value="july"/>
                    <label htmlFor="month-july"> July </label>
                </button>
                
                <button className="btn-attendance-months">
                    <input type="radio" 
                    name="input-month" 
                    className="input-month-radio" 
                    id="month-august"
                    value="august"/>
                    <label htmlFor="month-august"> August </label>
                </button>
                
                <button className="btn-attendance-months">
                    <input type="radio" 
                    name="input-month"
                    className="input-month-radio"
                    id="month-september"
                    value="september"/>
                    <label htmlFor="month-september"> September </label>
                </button>
                
                <button className="btn-attendance-months">
                    <input type="radio" 
                    name="input-month" 
                    className="input-month-radio"
                    id="month-october"
                    value="october"/>
                    <label htmlFor="month-october"> October </label>
                </button>
                
            </div>
    )
}