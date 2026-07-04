import { useState } from "react"
import "./AddCourse.css"
import {EntryForm} from "./EntryForm.jsx"
import { EntryCardContainer } from "./EntryCardContainer.jsx";
import { ButtonAddCourse } from "./ButtonAddCourse.jsx";
import getObj from "../../Utils/Course.js";
export function AddCourse({EntryCard,setEntryCard})
{
    
    const [showEntryForm,setShowEntryForm] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseCredits, setCourseCredits]= useState('');
    const [toolTipName, setToolTipName] = useState(false);
    const [toolTipCredits, setToolTipCredits] = useState(false);
    function toggleShowEntryForm()
    {
        setShowEntryForm(!showEntryForm);
        setCourseCredits(null);
        setCourseName(null);
        setToolTipName(false);
        setToolTipCredits(false);
    }
    
    function trackCourseName(event)
    {
        setCourseName(event.target.value);
        if(event.target.value)
        {
            setToolTipName(false);
        }
    }

    function trackCourseCredits(event)
    {
        setCourseCredits(event.target.value);
        if(event.target.value)
        {
            setToolTipCredits(false);
        }
    }

    function addCourseBtn()
    {
        if(courseName&&courseCredits)
        {
            const obj = getObj(courseName,courseCredits);
            const newList = [...EntryCard,obj];
            setEntryCard(newList);
            toggleShowEntryForm();
        }
        else if (!courseName)
        {
            setToolTipName(true);
        }
        else if (!courseCredits)
        {
            setToolTipCredits(true);
        }
    }

    function cancelCourseBtn()
    {
        toggleShowEntryForm();
    }

    function removeCourse(courseName)
    {
        const newList = EntryCard.filter((course)=>{
            if(course.courseName!==courseName){return true}
            return false;
        })
        setEntryCard(newList);
    }

    const input1={type:"text",placeholder:"Course Name",toolTip:toolTipName,fn:trackCourseName};
    const input2={type:"number",placeholder:"Credits",toolTip:toolTipCredits,fn:trackCourseCredits};
    const button1={text: "Add", alert:false,fn:addCourseBtn}
    const button2={text: "Cancel", alert:true,fn:cancelCourseBtn}

    const inputs=[input1,input2];
    const buttons=[button1,button2];
    return (
        <>
        {showEntryForm&&
        <div style={{position:"relative"}}>
            <EntryForm inputs={inputs} buttons={buttons}/>
        </div>}

        <div className={showEntryForm?"div-addcourse blurred":"div-addcourse"}>
            <div className="div-addcourse-text"> Add Your Courses</div>
            <div className="div-btn-addcourse">
                <ButtonAddCourse toggleShowEntryForm={toggleShowEntryForm}
                    text="+ Add" />
                <div className="div-btn-addcourse-count">
                    {EntryCard.length>1?`${EntryCard.length} Courses`
                        :EntryCard.length==1?"1 Course"
                        :"No Courses"} Added 
                    </div>
            </div>
            
        </div>
         
          {EntryCard.length>0&&<div className={showEntryForm?"blurred":""}>
                    <EntryCardContainer 
                        items={EntryCard}
                        heading1="courseName"
                        body1="courseCredits"
                        body2="C R E D I T S"
                        trashFunction={removeCourse}
                    />
            </div>}
         
        </>
    )
}