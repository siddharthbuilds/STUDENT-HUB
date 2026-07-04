import { useState } from "react"
import "./AddCourse.css"
import {EntryForm} from "./EntryForm.jsx"
import { CourseListContainer } from "./CourseListContainer.jsx";
import { CourseList } from "./CourseList.jsx";
import { ButtonAddCourse } from "./ButtonAddCourse.jsx";
import getObj from "../../Utils/Course.js";
export function AddCourse({courseList,setCourseList})
{
    
    const [showEntryForm,setShowEntryForm] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseCredits, setCourseCredits]= useState('');
    const [toolTipName, showToolTipName] = useState(false);
    const [toolTipCredits, showToolTipCredits] = useState(false);
    function toggleShowEntryForm()
    {
        setShowEntryForm(!showEntryForm);
    }
    
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
        if(courseName&&courseCredits)
        {
            const obj = getObj(courseName,courseCredits);
            const newList = [...courseList,obj];
            setCourseList(newList);
            toggleShowEntryForm();
        }
        else if (!courseName)
        {
            showToolTipName(true);
        }
        else if (!courseCredits)
        {
            showToolTipCredits(true);
        }
    }

    function cancelCourseBtn()
    {
        toggleShowEntryForm();
    }

    const input1={type:"text",placeholder:"Course Name",toolTip:toolTipName};
    const input2={type:"number",placeholder:"Credits",toolTip:toolTipCredits};
    const button1={text: "Add", alert:false}
    const button2={text: "Cancel", alert:true}

    return (
        <>
        {showEntryForm&&<div style={{position:"relative"}}>

            <EntryForm input1={input1} input2={input2} input1Fn={trackCourseName}
                    input2Fn={trackCourseCredits} button1={button1} button2={button2}
                    button1Fn={addCourseBtn} button2Fn={cancelCourseBtn}
                />
        </div>
                            }
        <div className={showEntryForm?"div-addcourse blurred":"div-addcourse"}>
            <div className="div-addcourse-text"> Add Your Courses</div>
            <div className="div-btn-addcourse">
                <ButtonAddCourse toggleShowEntryForm={toggleShowEntryForm}
                    text="+ Add" />
                <div className="div-btn-addcourse-count">
                    {courseList.length>1?`${courseList.length} Courses`
                        :courseList.length==1?"1 Course"
                        :"No Courses"} Added 
                    </div>
            </div>
            
        </div>
         
          {courseList.length>0&&<div className={showEntryForm?"blurred":""}>
                    <CourseListContainer courseList={courseList} 
                setCourseList={setCourseList} keyword="C R E D I T S" 
                property2="courseCredits"/>
            </div>}
         
        </>
    )
}