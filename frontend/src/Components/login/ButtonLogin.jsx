import "./ButtonLogin.css"
export function ButtonLogin({text,onClick,bad=false})
{
    return(
        <div>
            <button className={bad?"btn-bad":"btn-login"}
            onClick={onClick}> 
            {text} 
            </button>
         </div>
    )
}