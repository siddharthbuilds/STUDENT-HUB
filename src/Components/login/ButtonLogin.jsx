import "./ButtonLogin.css"
export function ButtonLogin({text})
{
    return(
        <div>
            <button className="btn-login"> {text} </button>
         </div>
    )
}