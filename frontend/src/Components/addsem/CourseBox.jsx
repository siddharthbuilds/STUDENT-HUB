import "./CourseBox.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
import { Tooltip } from "../ToolTip.jsx"
import { useState } from "react"
export function CourseBox({toggleShowCourseBox, courseList, setCourseList})
{
    const [courseName, setCourseName] = useState('');
    const [courseCredits, setCourseCredits]= useState('');
    const [toolTipName, showToolTipName] = useState(false);
    const [toolTipCredits, showToolTipCredits] = useState(false);

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
        if(courseName && courseCredits)
        {
            const obj = {courseName,courseCredits};
            const newList = [...courseList,obj];
            setCourseList(newList);
            toggleShowCourseBox();
        }
        else if (!courseName)
        {
            showToolTipName(true);
        }
        else if(!courseCredits)
        {
            showToolTipCredits(true);
        }
        
    }

    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                <div className="div-course-attributes-name">
                   <Input placeholder="Course Name" size="40" onChange={trackCourseName}/>
                   {toolTipName&&<div className="div-course-attributes-tooltip">
                    <Tooltip message="Enter Name"/>
                    </div>
                    } 
                </div>
                <div className="div-course-attributes-credits">
                    <Input placeholder="Credits" size="3" onChange={trackCourseCredits} type="number"/>
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