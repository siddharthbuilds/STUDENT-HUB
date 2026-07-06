import "./ExamSection.css"
import { ButtonAddCourse } from "./ButtonAddCourse"
import { EntryForm } from "./EntryForm"
import { EntryCardContainer } from "./EntryCardContainer"
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

    const input1={type:"date",placeholder:"From",toolTip:toolTipFrom,fn:trackFromDate}
    const input2={type:"date",placeholder:"To",toolTip:toolTipTo,fn:trackToDate}
    const input3={type:"text",placeholder:"Description",toolTip:false,fn:trackDescription}
    const button1={text: "Add", alert:false,fn:addExamBtn}
    const button2={text:"Cancel", alert:true,fn:toggleShowEntryForm}

    const inputs=[input1,input2,input3];
    const buttons=[button1,button2];

    function toggleShowEntryForm()
    {
        setShowEntryForm(!showEntryForm);
        setToolTipFrom(false);
        setToolTipTo(false);
        setFromDate(null);
        setToDate(null);
        setDescription(null);
    }

    function removeExam(uuid)
    {
        setExamList(examList.filter((exam)=>{
            if(exam.uuid===uuid) {return false}
            return true;
        })
        )
    }
    return(<>
        <div className="div-exam-section">
            <div className={showEntryForm?"div-exam-section-header blurred":"div-exam-section-header"}>
                {headerName}
            </div>
            <div className="div-exam-section-body" style={{position:"relative"}}>
                <ButtonAddCourse text={`+ Add ${buttonName}`} toggleShowEntryForm={toggleShowEntryForm}/>
                {showEntryForm&&
                    <EntryForm inputs={inputs} buttons={buttons} />}
            </div>
            <div className={showEntryForm?"blurred":""}>
                <EntryCardContainer 
                    data={examList}
                    items={[
                            {content:'from',type:'date'},
                            {content:'',type:'text',description:'To'},
                            {content:'to',type:'date'},
                            {content:'description',type:'text'},
                        ]}
                    trashFunction={removeExam}
                />
            </div>
             
        </div>
    </>)
}