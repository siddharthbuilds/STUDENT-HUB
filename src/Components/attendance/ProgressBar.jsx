import "./ProgressBar.css"
export function ProgressBar({width})
{
    return(
        <>
            <div className="div-progress">
                <div className={Number(width)>=80?`div-progress-fill style-safe`
                    :Number(width)>=70&&Number(width)<80? `div-progress-fill style-risk`
                    :`div-progress-fill style-bad`
                } style={{width: `${Number(width)}%`}}></div>
            </div>
        </>
    )
}