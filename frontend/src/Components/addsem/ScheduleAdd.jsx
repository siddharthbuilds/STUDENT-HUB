import "./ScheduleAdd.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { EntryForm } from "./EntryForm";
import { EntryCardContainer } from "./EntryCardContainer";
import { useState } from "react";


export function ScheduleAdd({courseList,setCourseList,day,showEntryForm,setShowEntryForm})
{
    function trashFunction(courseName)
    {
        setCourseList(courseList.map((course)=>{
                if (course.courseName===courseName)
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
            list:courseList,toolTip:toolTip,
            fn:toggleToolTip}
    const input2={type:"dropdown",placeholder:"x 1",
            dropdownOption:multiplier, dropdownFn:setMultiplier,
            property:null,
            list:dropdown2, toolTip:false};
    const button1={text:"Add",alert:false,fn:addScheduleBtn};
    const button2={text:"Cancel",alert:true,fn:cancelScheduleBtn};
    
    const inputs=[input1,input2];
    const buttons=[button1,button2];

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

    const filteredList = courseList.filter((course)=>{

        if(course[day]!=0){return true};
        return false;
    })
    return(
        <>
            <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
            {showEntryForm&&
                <EntryForm inputs={inputs} buttons={buttons}/> }
            </div>

        <div className={showEntryForm?"div-btn-schedule-add blurred":"div-btn-schedule-add"}>
        <ButtonAddCourse text="+ Add Hours" toggleShowEntryForm={toggleShowEntryForm}/>
        </div>
        
        
        {filteredList.length>0&&<div style={{display:"flex",justifyContent:"center"}}className={showEntryForm?"blurred":""}>
                            <EntryCardContainer 
                                data={filteredList} 
                                items={[{content:'courseName',type:'text'},
                                        {content:day,type:'text'}
                                        ]}
                                trashFunction={trashFunction}
                            />
                            </div>}
        </>
    )
}