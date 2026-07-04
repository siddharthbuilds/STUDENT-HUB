import "./EntryCard.css"
import {TrashImage} from "../home/TrashImage.jsx"
export function EntryCard(
    {
        item, heading1,heading2,heading3, body1,body2, trashFunction
    })
{
    return(
        <>
            <div className="div-course">
                <div className="div-course-list-name">
                    {item[heading1]||heading1}
                </div>

                {heading2&&<div className="div-course-list-name">
                    {item[heading2]||heading2}
                </div>}

                {heading3&&<div className="div-course-list-name">
                    {item[heading3]||heading3}
                </div>}

                <div className="div-course-list-credits">
                    <div>{item[body1]||body1}</div>
                    {body2&&<div className="div-course-list-credits-txt"> {item[body2]||body2}</div>}
                </div>

                <div className="div-course-list-btn">
                    <button className="btn-course-list">
                        <TrashImage color="white" size="30" onClick={()=>{trashFunction(item[heading1]||item.courseName)}}/>
                    </button>
                </div>
            </div>
        </>
    )
}
