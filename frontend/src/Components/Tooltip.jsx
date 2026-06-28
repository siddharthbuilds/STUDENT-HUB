import "./Tooltip.css"

export function Tooltip({message})
{
    return(
        <>
        <div class="error-box">
            <span class="error-message">{message}</span>
        </div>

        </>
    )
}