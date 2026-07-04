import "./ExamSection.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { EntryForm } from "./EntryForm"
import { CourseListContainer } from "./CourseListContainer"
import { useState } from "react"
import getObj from "../../Utils/Course"
export function ExamSection({headerName, buttonName,examList,setExamList})
{
    const [showEntryForm,setShowEntryForm] = useState(false);
    const [fromDate, setFromDate]=useState(null);
    const [toDate, setToDate]=useState(null);
    const [description, setDescription]=useState(null);
    const [toolTipFrom, setToolTipFrom]=useState(false);
    const [toolTipTo,setToolTipTo]=useState(false);

    function trackFromDate(event)
    {
        setFromDate(event.target.value);
        if(event.target.value)
        {
            setToolTipFrom(false);
        }
        
    }

    function trackToDate(event)
    {
        setToDate(event.target.value);
        if(event.target.value)
        {
            setToolTipTo(false);
        }
    }

    
    function trackDescription(event)
    {
        setDescription(event.target.value);
    }

    function addExamBtn()
    {
        if(!fromDate)
        {
            setToolTipFrom(true);
        }
        else if(!toDate)
        {
            setToolTipTo(true);
        }
        else{
            const obj = getObj(fromDate,toDate,description);
            const newList = [...examList,obj];
            setExamList(newList);
            toggleShowEntryForm();
        }
        
    }

    const input1={type:"date",placeholder:"From",toolTip:toolTipFrom}
    const input2={type:"date",placeholder:"To",toolTip:toolTipTo}
    const input3={type:"text",placeholder:"Description",toolTip:false}
    const button1={text: "Add", alert:false}
    const button2={text:"Cancel", alert:true}

    function toggleShowEntryForm()
    {
        setShowEntryForm(!showEntryForm);
        setToolTipFrom(false);
        setToolTipTo(false);
        setFromDate(null);
        setToDate(null);
        setDescription(null);
    }
    return(<>
        <div className="div-exam-section">
            <div className={showEntryForm?"div-exam-section-header blurred":"div-exam-section-header"}>
                {headerName}
            </div>
            <div className="div-exam-section-body" style={{position:"relative"}}>
                <ButtonAddCourse text={`+ Add ${buttonName}`} toggleShowEntryForm={toggleShowEntryForm}/>
                {showEntryForm&&
                    <EntryForm input1={input1} input2={input2} input3={input3} 
                    input1Fn={trackFromDate} input2Fn={trackToDate} 
                    input3Fn={trackDescription}
                    button1={button1} button2={button2}
                    button1Fn={addExamBtn} button2Fn={toggleShowEntryForm}
                    />}
            </div>
            <div className={showEntryForm?"blurred":""}>
                <CourseListContainer courseList={examList} setCourseList={setExamList}
                type="date" property2="des"
                />
            </div>
             
        </div>
    </>)
}