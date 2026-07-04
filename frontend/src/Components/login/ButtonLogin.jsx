import "./ButtonLogin.css"
export function ButtonLogin({text,onClick,alert=false})
{
    return(
        <div>
            <button className={alert?"btn-alert":"btn-login"}
            onClick={onClick}> 
            {text} 
            </button>
         </div>
    )
}