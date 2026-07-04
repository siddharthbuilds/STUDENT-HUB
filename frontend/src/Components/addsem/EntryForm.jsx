import "./EntryForm.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
import { Tooltip } from "../ToolTip.jsx"
import CustomDropdown from "./DropDown.jsx"

export function EntryForm({input1,input2,input3,
    input1Fn,input2Fn,input3Fn,button1,button2,button1Fn,button2Fn
    })
{
 
    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                {input1&&<div className="div-course-attributes-input" onClick={input1.type=="dropdown"?input1Fn:()=>{}}>
                   {input1.type!="dropdown"?
                   <Input placeholder={input1.placeholder} 
                        onChange={input1Fn} type={input1.type}/>
                        :<CustomDropdown options={input1.list} name={input1.placeholder}
                        property={input1.property}
                        selectedOption={input1.dropdownOption} 
                        setSelectedOption={input1.dropdownFn}
                        />
                    }

                    {input1.type=="date"&&<div className="div-type-date-plchdr">{input1.placeholder} </div>}

                   {input1.toolTip&&<div className="div-course-attributes-tooltip">
                    <Tooltip message={`Enter ${input1.placeholder}`}/>
                    </div>
                    } 
                </div>}
                {/* Second Input */}
                {input2&&<div className="div-course-attributes-input">
                    {input2.type!="dropdown"?
                    <Input placeholder={input2.placeholder}
                        onChange={input2Fn} type={input2.type}/>
                        :<CustomDropdown options={input2.list} name={input2.placeholder}
                        property={input2.property}
                        selectedOption={input2.dropdownOption} 
                        setSelectedOption={input2.dropdownFn}
                        />
                    }

                    {input2.type=="date"&&<div className="div-type-date-plchdr">{input2.placeholder} </div>}
                    {input2.toolTip&&<div className="div-course-attributes-tooltip">
                    <Tooltip message={`Enter ${input2.placeholder}`}/>
                    </div>
                    } 
                </div>}

                {/* Third Input */}
                {input3&&<div className="div-course-attributes-input">
                    {input3.type!="dropdown"?
                    <Input placeholder={input3.placeholder}
                        onChange={input3Fn} type={input3.type}/>
                        :<CustomDropdown options={input3.list} name={input3.placeholder}
                        property={input3.property}
                        selectedOption={input3.dropdownOption} 
                        setSelectedOption={input3.dropdownFn}
                        />
                    }

                    {input3.type=="date"&&<div className="div-type-date-plchdr">{input3.placeholder} </div>}
                    {input3.toolTip&&<div className="div-course-attributes-tooltip">
                    <Tooltip message={`Enter ${input3.placeholder}`}/>
                    </div>
                    } 
                </div>
}
            </div>
            <div className="div-course-buttons">
                <ButtonLogin text={button1.text} onClick={button1Fn} alert={button1.alert}/>
                <ButtonLogin text={button2.text} onClick={button2Fn} alert={button2.alert}/>
            </div>
        </div>
        </>
    )
}