import "./Tooltip.css"

export function Tooltip({message})
{
    return(
        <>
        <div className="error-box">
            <span className="error-message">{message}</span>
        </div>

        </>
    )
}