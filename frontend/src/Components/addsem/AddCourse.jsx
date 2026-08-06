import { useState } from "react"
import "./AddCourse.css"
import {EntryForm} from "./EntryForm.jsx"
import {EntryCardContainer } from "./EntryCardContainer.jsx";
import {EntryCard } from "./EntryCard.jsx";
import { ButtonAddCourse } from "./ButtonAddCourse.jsx";
import getObj from "../../Utils/Course.js";
export function AddCourse({courseList,setCourseList})
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
    
    // if(courseName)
    // {
    //     setToolTipName(false);
    // }

    // if(courseCredits)
    // {
    //     setToolTipCredits(false);
    // }

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

    function removeCourse(uuid)
    {
        const newList = courseList.filter((course)=>{
            if(course.uuid!==uuid){return true}
            return false;
        })
        setCourseList(newList);
    }

    const input1={type:"text",
        placeholder:"Course Name",
        toolTip:toolTipName,
        toolTipFn:setToolTipName,
        fn:setCourseName};
    const input2={type:"number",
        placeholder:"Credits",
        toolTip:toolTipCredits,
        toolTipFn:setToolTipCredits,
        fn:setCourseCredits};
    const button1={text: "Add", alert:false,fn:addCourseBtn}
    const button2={text: "Cancel", alert:true,fn:cancelCourseBtn}

    const inputs=[input1,input2];
    const buttons=[button1,button2];

    const items=[
            {content:'courseName',type:'text'},
            {content:'courseCredits',type:'text',description:'C R E D I T S'}
        ]

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
                    {courseList.length>1?`${courseList.length} Courses`
                        :courseList.length==1?"1 Course"
                        :"No Courses"} Added 
                    </div>
            </div>
            
        </div>
         
          {courseList.length>0&&<div className={showEntryForm?"blurred":""}>
                    <EntryCardContainer
                        data={courseList}
                        items={items}
                        trashFunction={removeCourse}
                    />
            </div>}
         
        </>
    )
}