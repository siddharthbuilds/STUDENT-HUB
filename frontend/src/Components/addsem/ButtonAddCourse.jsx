import "./ButtonAddCourse.css"

export function ButtonAddCourse({toggleShowEntryForm,text})
{
    return(
        <>
        <div>
            <button className="btn-addcourse" 
                onClick={toggleShowEntryForm}> {text}
            </button>
        </div>
        </>
    )
}