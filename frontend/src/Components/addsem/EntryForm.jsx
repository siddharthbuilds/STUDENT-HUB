import "./EntryForm.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
import { Tooltip } from "../Tooltip.jsx";
import CustomDropdown from "./DropDown.jsx"

export function EntryForm({inputs,buttons})
{
 
    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                {inputs.map((input)=>{
                    return(<div key={input.placeholder}>
                    <div className="div-course-attributes-input" 
                        onClick={input.type==="dropdown"?input.fn:()=>{input.toolTipFn(false)}}>
                    {input.type!="dropdown"?
                        <Input placeholder={input.placeholder} 
                            onChange={input.fn}
                             type={input.type}/>
                            :<CustomDropdown options={input.list} name={input.placeholder}
                            property={input.property}
                            selectedOption={input.dropdownOption} 
                            setSelectedOption={input.dropdownFn}
                            />
                        }

                    {input.type=="date"&&<div className="div-type-date-plchdr">{input.placeholder} </div>}

                    {input.toolTip&&<div className="div-course-attributes-tooltip">
                        <Tooltip message={`Enter ${input.placeholder}`}/>
                        </div>
                        } 
                    </div>
                    </div>)
                })}
                </div>
                <div className="div-course-buttons">
                {buttons.map((button)=>{return(
                    <div key={button.text}>
                    <ButtonLogin text={button.text} 
                    onClick={button.fn} 
                    alert={button.alert}/>
                    </div>
                )})}
                </div>
        </div>
        </>
    )
}