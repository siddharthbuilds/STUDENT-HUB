import "./CourseBox.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
import { Tooltip } from "../ToolTip.jsx"
import { useState } from "react"
import CustomDropdown from "./DropDown.jsx"
import getObj from "../../Utils/Course.js"
export function CourseBox({toggleShowCourseBox, 
        courseList, setCourseList,
        dropdown1=false,dropdown2=false,day,type1="text",type2="text"
    })
{
    const [courseName, setCourseName] = useState('');
    const [courseCredits, setCourseCredits]= useState('');
    const [toolTipName, showToolTipName] = useState(false);
    const [toolTipCredits, showToolTipCredits] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState('x 1');
    const [descriptionText,setDescriptionText]=useState('');

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

    function trackDescription(event)
    {
        setDescriptionText(event.target.value);
    }


    function addCourseBtn()
    {
        const name = dropdown1?selectedOption1:courseName;
        const credits = dropdown2?selectedOption2:courseCredits;

        if (!name)
        {
            showToolTipName(true);
        }
        else if(!credits)
        {
            showToolTipCredits(true);
        }

        
        if(!dropdown1&&!dropdown2&&type1!="date"&&type2!="date"&&name&&credits)
        {
            const obj = getObj(name,credits);
            const newList = [...courseList,obj];
            setCourseList(newList);
            toggleShowCourseBox();
        }
        else if (type1!="date"&&type2!="date"&&name&&credits){
            const course = courseList.find(course=>{return course.courseName==name});
            course[day]=credits;
            toggleShowCourseBox();
        }

        else if(type1=="date"&&type2=="date"&&name&&credits)
        {
            const obj = getObj(name,credits,descriptionText);
            const newList = [...courseList,obj];
            setCourseList(newList);
            toggleShowCourseBox();
        }
        
    }

    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                <div className="div-course-attributes-name" onClick={()=>{showToolTipName(false)}}>
                   {!dropdown1?
                   <Input placeholder="Course Name" 
                        size="40" onChange={trackCourseName} type={type1}/>
                        :<CustomDropdown options={courseList} name="Course Name"
                        property="courseName"
                        selectedOption={selectedOption1} 
                        setSelectedOption={setSelectedOption1}
                        />
                        
                    }

                    {type1=="date"&&<div className="div-type-date-plchdr">From </div>}

                   {toolTipName&&<div className="div-course-attributes-tooltip">
                    <Tooltip message={type1=="date"?"Enter Date":"Enter Name"}/>
                    </div>
                    } 
                </div>
                <div className="div-course-attributes-credits">
                    {!dropdown2?
                    <Input placeholder="Credits" 
                        size="3" 
                        onChange={trackCourseCredits} type={type2}/>
                        :<CustomDropdown options={dropdown2} name="x 1"
                        selectedOption={selectedOption2} 
                        setSelectedOption={setSelectedOption2}
                        />
                    }

                    {type2=="date"&&<div className="div-type-date-plchdr">To </div>}
                    {toolTipCredits&&<div className="div-course-attributes-tooltip">
                    <Tooltip message={type2=="date"?"Enter Date":"Enter Credits"}/>
                    </div>
                    } 
                </div>
                {type1=="date"&&type2=="date"&&<div className="div-course-attributes-desc">
                    <Input placeholder="Description" type="text" onChange={trackDescription}/>
                </div>}
            </div>
            <div className="div-course-buttons">
                <ButtonLogin text="Add" onClick={addCourseBtn}/>
                <ButtonLogin text="Cancel" onClick={toggleShowCourseBox} bad={true}/>
            </div>
        </div>
        </>
    )
}