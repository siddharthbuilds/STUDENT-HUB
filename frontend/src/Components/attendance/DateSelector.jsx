import "./DateSelector.css"
export function DateSelector({start,end})
{
    const starting = Number(start);
    const ending = Number(end);
    const myRange=[];
    for(let i=starting;i<=ending;i++)
    {
        myRange.push(i);
    }
    return(
        <div className="div-attendance-dates">
            {myRange.map(number=>{
                return (
                    <div className="div-attendance-day">
                        <button className="btn-attendance-day">{number}</button>
                    </div>
                )
            })}
        </div>
    )
}