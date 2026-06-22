import "./ButtonLogin.css"
export function ButtonLogin({text,onClick})
{
    return(
        <div>
            <button className="btn-login" onClick={onClick}> {text} </button>
         </div>
    )
}