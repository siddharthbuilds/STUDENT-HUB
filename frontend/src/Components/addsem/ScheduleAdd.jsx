import "./ScheduleAdd.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { EntryForm } from "./EntryForm";
import { CourseListContainer } from "./CourseListContainer";
import { useState } from "react";


export function ScheduleAdd({courseList,setCourseList,day,showEntryForm,setShowEntryForm})
{
    function trashFunction(index)
    {
        setCourseList(courseList.map((course,ind)=>{
                if (index === ind)
                {
                    return {...course,[day]:0}
                }
                return course;
        }))
    }
    const dropdown2=["x 1","x 2","x 3"];

    const [selectedCourse,setSelectedCourse] = useState('');
    const [multiplier,setMultiplier]=useState('x 1');
    const [toolTip,setToolTip] = useState(false);
    const input1={type:"dropdown",placeholder:"Course",
            dropdownOption: selectedCourse, dropdownFn: setSelectedCourse,
            property: "courseName",
            list:courseList,toolTip:toolTip};
    const input2={type:"dropdown",placeholder:"x 1",
            dropdownOption:multiplier, dropdownFn:setMultiplier,
            property:null,
            list:dropdown2, toolTip:false};
    const button1={text:"Add",alert:false};
    const button2={text:"Cancel",alert:true};
    
    

    function toggleShowEntryForm()
    {
        setShowEntryForm(!showEntryForm);
        setToolTip(false);
        setSelectedCourse(null);
    }

    function toggleToolTip()
    {
        setToolTip(false);
    }

    function addScheduleBtn()
    {
        if(!selectedCourse)
        {
            setToolTip(true);
        }
        else{
            
            setCourseList(courseList.map((course)=>{
                if(course.courseName==selectedCourse)
                {
                        return {...course,[day]: multiplier};
                }
                return course;
                }))
            toggleShowEntryForm();
        }
    }

    function cancelScheduleBtn()
    {
        toggleShowEntryForm();
    }
    return(
        <>
            <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
            {showEntryForm&&
                    <EntryForm input1={input1} input2={input2}
                            input1Fn={toggleToolTip}
                            button1={button1} button2={button2}
                            button1Fn={addScheduleBtn} button2Fn={cancelScheduleBtn}
                            />
                    }
            </div>

        <div className={showEntryForm?"div-btn-schedule-add blurred":"div-btn-schedule-add"}>
        <ButtonAddCourse text="+ Add Hours" toggleShowEntryForm={toggleShowEntryForm}/>
        </div>
        
        
        {courseList.length>0&&<div style={{display:"flex",justifyContent:"center"}}className={showEntryForm?"blurred":""}>
                                <CourseListContainer courseList={courseList} 
                                setCourseList={setCourseList}
                                property2={day}
                                trashFunction={trashFunction}
                                />
                                </div>}
        </>
    )
}