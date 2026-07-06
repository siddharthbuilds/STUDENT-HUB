import "./SatBox.css"
import CustomDropdown from "./DropDown";
import {useState } from "react";
export function SatBox({date,uuid,addStatus})
{
    const buttons=[{button:'M',value:"mon"},
                    {button:'Tu',value:"tue"},
                    {button:'W',value:"wed"},
                    {button:'Th',value:"thu"},
                    {button:'F',value:"fri"}
                    ];

    const options=['Class','Holiday'];
    const [selectedOption,setSelectedOption] = useState('Holiday');
    const [buttonSelected,setButtonSelected] = useState('mon');
    
    function onButtonChange(event)
    {
        const newButton = event.target.value;
        setButtonSelected(newButton);
        addStatus(uuid,selectedOption,newButton);
    }

     function onOptionChange(newOption)
    {
        setSelectedOption(newOption);
        addStatus(uuid,newOption,buttonSelected);
    }

    return(<>
         <div className="div-sat-body">
                <div className="div-sat-body-date">
                Sat, {date}
                </div>
                <div onChange={onOptionChange}>
                    <CustomDropdown 
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={onOptionChange}
                fontSize="18px"
                backgroundColor="#002640"
                name="Holiday"
                />
                </div>
                
                {selectedOption=="Class"&&<div className="div-sat-body-opt">
                    {buttons.map((button)=>{return(
                        <div key={button.value}>
                    <button className={button.value==buttonSelected?"btn-sat-body-opt btn-sat-clicked":
                        "btn-sat-body-opt" 
                    }
                        onClick={onButtonChange}
                        value={button.value}
                    >
                        {button.button} 
                        </button>
                        </div>
                    )})}
                </div>}
                
        </div>
    </>)
    
}