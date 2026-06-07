import toastImage from "../../images/tickmark.png"
import "./Toast.css"
export function Toast({message,show})
{
    return(
        <>
        <div className={`div-toast ${show ? "div-toast-show" :""}`}>
            <div className="div-toast-txt">
                {message}
            </div>
            <img className="img-toast" src={toastImage}/>
        </div>
        </>
    )
}