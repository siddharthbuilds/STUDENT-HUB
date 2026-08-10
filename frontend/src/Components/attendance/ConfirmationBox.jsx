import "./ConfirmationBox.css"
import {useState} from "react"
import { Toast } from "../register/Toast";
export function ConfirmationBox({message1,message2,option1, option2, toastmessage,setTrackConfirmation,saveFunction})
{
    const [trackSave,setTrackSave] = useState(false);
    function onClickConfirmSave()
    {
        setTrackSave(true);
        saveFunction();
        setTimeout(()=>{
            setTrackSave(false);
            setTrackConfirmation(false);
        },3000)
    }

    function onClickConfirmCancel()
    {
        setTrackConfirmation(false);
    }
    return(
        <>
        {!trackSave&&
            <div className="div-confirmation-container">
            <div className="div-confirmation-message">
                <div> 
                    {message1}
                </div> 
                <div>
                    {message2}
                </div>
                
            </div>
            <div className="div-confirmation-options">
                <div className="div-confirmation-option" onClick={onClickConfirmSave}>
                {option1}
                </div>
                <div className="div-confirmation-option div-cancel-option" onClick={onClickConfirmCancel}>
                {option2}
                </div>
            </div>
            
        </div>}
        <Toast message={toastmessage} show={trackSave} />
        </>
        
    )
}