import "./CourseBox.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
import { Tooltip } from "../ToolTip.jsx"
import { useState } from "react"
import CustomDropdown from "./DropDown.jsx"
export function CourseBox({toggleShowCourseBox, 
        courseList, setCourseList,
        dropdown1=false,dropdown2=false})
{
    const [courseName, setCourseName] = useState('');
    const [courseCredits, setCourseCredits]= useState('');
    const [toolTipName, showToolTipName] = useState(false);
    const [toolTipCredits, showToolTipCredits] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState('x 1');

    function trackCourseName(event)
    {
        setCourseName(event.target.value);
        if(event.target.value)
        {
            showToolTipName(false);
        }
    }

    function trackCourseCredits(event)
    {
        setCourseCredits(event.target.value);
        if(event.target.value)
        {
            showToolTipCredits(false);
        }
    }


    function addCourseBtn()
    {
        const name = dropdown1?selectedOption1:courseName;
        const credits = dropdown2?selectedOption2:courseCredits;

        if(name && credits)
        {
            const obj = {courseName: name,courseCredits: credits};
            const newList = [...courseList,obj];
            setCourseList(newList);
            toggleShowCourseBox();
        }
        else if (!name)
        {
            showToolTipName(true);
        }
        else if(!credits)
        {
            showToolTipCredits(true);
        }
        
    }

    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                <div className="div-course-attributes-name" onClick={()=>{showToolTipName(false)}}>
                   {!dropdown1?
                   <Input placeholder="Course Name" 
                        size="40" onChange={trackCourseName}/>
                        :<CustomDropdown options={dropdown1} name="Course Name"
                        selectedOption={selectedOption1} 
                        setSelectedOption={setSelectedOption1}
                        />
                    }

                   {toolTipName&&<div className="div-course-attributes-tooltip">
                    <Tooltip message="Enter Name"/>
                    </div>
                    } 
                </div>
                <div className="div-course-attributes-credits">
                    {!dropdown2?
                    <Input placeholder="Credits" 
                        size="3" 
                        onChange={trackCourseCredits} type="number"/>
                        :<CustomDropdown options={dropdown2} name="x 1"
                        selectedOption={selectedOption2} 
                        setSelectedOption={setSelectedOption2}
                        />
                    }
                    {toolTipCredits&&<div className="div-course-attributes-tooltip">
                    <Tooltip message="Enter Credits"/>
                    </div>
                    } 
                </div>
            </div>
            <div className="div-course-buttons">
                <ButtonLogin text="Add" onClick={addCourseBtn}/>
                <ButtonLogin text="Cancel" onClick={toggleShowCourseBox} bad={true}/>
            </div>
        </div>
        </>
    )
}