import "./ViewButton.css"
import { useState } from "react"
import dropdownImage from "../../images/dropdown.png"
import dropupImage from "../../images/dropup.png"
import { GradeCourse } from "./GradeCourse"
export function ViewButton({message,component})
{
    const Component = component;
    const [viewButton,setViewButton] = useState(false);
    function toggleViewButton(){
        setViewButton(!viewButton);}
    return(
        <>
        <div className="div-viewdetails">
                    <button className="btn-viewdetails" 
                    onClick={()=>{
                        toggleViewButton();
                    }}>
                        <div>{message} </div>
                        <div>
                           <img src={viewButton?dropupImage:dropdownImage} 
                        className="img-dropdown"/>  
                        </div>
                    </button>
                </div>
            {viewButton&& <Component />}
        </>
    )
}