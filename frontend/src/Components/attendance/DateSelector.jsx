import "./DateSelector.css"
export function DateSelector({data})
{
    const starting = 1;
    const ending = Number(data.last);
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