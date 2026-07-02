import "./SatBox.css"
import CustomDropdown from "./DropDown";
import { useState } from "react";
export function SatBox({date})
{
    const buttons=['M','Tu','W','Th','F'];
    const options=['Class','Holiday'];
    const [selectedOption,setSelectedOption] = useState(null);
    const [buttonSelected,setButtonSelected] = useState(null);
    return(<>
         <div className="div-sat-body">
                <div className="div-sat-body-date">
                Sat, {date}
                </div>
                <CustomDropdown 
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                fontSize="18px"
                backgroundColor="#002640"
                name="Options"
                />
                {selectedOption=="Class"&&<div className="div-sat-body-opt">
                    {buttons.map((button,index)=>{return(
                        <div key={index}>
                    <button className={button==buttonSelected?"btn-sat-body-opt btn-sat-clicked":
                        "btn-sat-body-opt"
                    }
                        onClick={()=>{setButtonSelected(button)}}
                    >
                        {button} 
                        </button>
                        </div>
                    )})}
                </div>}
                
        </div>
    </>)
    
}