import "./EntryForm.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
import { Tooltip } from "../ToolTip.jsx"
import { useState } from "react"
import CustomDropdown from "./DropDown.jsx"
export function EntryForm({input1,input2,input3,
    input1Fn,input2Fn,input3Fn,button1,button2,button1Fn,button2Fn
    })
{
 
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState('x 1');
    // const [descriptionText,setDescriptionText]=useState('');

    

    // function trackDescription(event)
    // {
    //     setDescriptionText(event.target.value);
    // }


    // function addCourseBtn()
    // {
    //     const name = dropdown1?selectedOption1:courseName;
    //     const credits = dropdown2?selectedOption2:courseCredits;

    //     if (!name)
    //     {
    //         showToolTipName(true);
    //     }
    //     else if(!credits)
    //     {
    //         showToolTipCredits(true);
    //     }

        
    //     if(!dropdown1&&!dropdown2&&type1!="date"&&type2!="date"&&name&&credits)
    //     {
    //         const obj = getObj(name,credits);
    //         const newList = [...courseList,obj];
    //         setCourseList(newList);
    //         toggleShowEntryForm();
    //     }
    //     else if (type1!="date"&&type2!="date"&&name&&credits){
    //         const course = courseList.find(course=>{return course.courseName==name});
    //         course[day]=credits;
    //         toggleShowEntryForm();
    //     }

    //     else if(type1=="date"&&type2=="date"&&name&&credits)
    //     {
    //         const obj = getObj(name,credits,descriptionText);
    //         const newList = [...courseList,obj];
    //         setCourseList(newList);
    //         toggleShowEntryForm();
    //     }
        
    // }

    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                <div className="div-course-attributes-name" onClick={()=>{}}>
                   {input1.type!="dropdown"?
                   <Input placeholder={input1.placeholder} 
                        onChange={input1Fn} type={input1.type}/>
                        :<CustomDropdown options={input1.list} name={input1.dropdownName}
                        property={input1.property}
                        selectedOption={selectedOption1} 
                        setSelectedOption={setSelectedOption1}
                        />
                        
                    }

                    {input1.type=="date"&&<div className="div-type-date-plchdr">{input1.placeholder} </div>}

                   {input1.toolTip&&<div className="div-course-attributes-tooltip">
                    <Tooltip message={`Enter ${input1.placeholder}`}/>
                    </div>
                    } 
                </div>
                {/* Second Input */}
                <div className="div-course-attributes-credits">
                    {input2.type!="dropdown"?
                    <Input placeholder={input2.placeholder}
                        onChange={input2Fn} type={input2.type}/>
                        :<CustomDropdown options={input2.list} name={input2.dropdownName}
                        selectedOption={selectedOption2} 
                        setSelectedOption={setSelectedOption2}
                        />
                    }

                    {input2.type=="date"&&<div className="div-type-date-plchdr">{input2.placeholder} </div>}
                    {input2.toolTip&&<div className="div-course-attributes-tooltip">
                    <Tooltip message={`Enter ${input2.placeholder}`}/>
                    </div>
                    } 
                </div>

                {/* Third Input */}
                {input3&&<div className="div-course-attributes-desc">
                    <Input placeholder={input3.placeholder} type={input3.type} size={input3.size} 
                        onChange={input3Fn}/>
                </div>}
            </div>
            <div className="div-course-buttons">
                <ButtonLogin text={button1.text} onClick={button1Fn}/>
                <ButtonLogin text={button2.text} onClick={button2Fn} alert={button2.alert}/>
            </div>
        </div>
        </>
    )
}