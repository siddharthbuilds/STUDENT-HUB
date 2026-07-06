import "./EntryCard.css"
import {TrashImage} from "../home/TrashImage.jsx"
import formatDate from "../../Utils/FormatDate.js"
export function EntryCard(
    {
        data,items,trashFunction
    })
{
    return(
        <>
        <div className="div-entry-card">
            {items.length>0&&items.map((item,index)=>{
                return(
                    <div key={index}>
                        <div className="div-entry-card-content">
                        {
                            item.type!='date'?
                            data[item.content]||item.content
                            :formatDate(data[item.content])||item.content
                        }
                        
                        {item.description&&<div className="div-entry-card-content-description">
                            {item.description}
                            </div>}
                        </div>
                    </div>
                )
            })}

              
            <div className="div-entry-card-btn">
                <button className="btn-entry-card">
                    <TrashImage color="white" size="30" onClick={()=>{trashFunction(data.uuid)}}/>
                </button>
            </div>

        </div>
        </>
    )
}
