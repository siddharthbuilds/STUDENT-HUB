import "./ConfirmationBox.css"
import {useState} from "react"
import { Toast } from "../register/Toast";
export function ConfirmationBox({setTrackConfirmation})
{
    const [trackSave,setTrackSave] = useState(false);
    function onClickConfirmSave()
    {
        setTrackSave(true);
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
                    Are you sure want to save the changes?
                </div> 
                <div>
                    Note: Data once Saved, cannot be edited.
                </div>
                
            </div>
            <div className="div-confirmation-options">
                <div className="div-confirmation-option" onClick={onClickConfirmSave}>
                Save
                </div>
                <div className="div-confirmation-option div-cancel-option" onClick={onClickConfirmCancel}>
                Cancel
                </div>
            </div>
            
        </div>}
        <Toast message="All Changes Saved" show={trackSave} />
        </>
        
    )
}