import "./EntryCardContainer.css"
import { EntryCard } from "./EntryCard.jsx"
export function EntryCardContainer(
    {items, heading1,heading2,heading3, body1,body2, trashFunction}
    )
{
   
    return(
        <>
        <div className="div-course-list">
            {items&&items.map((item)=>{
                return(
                    <div key={item.courseName}>
                    <EntryCard 
                        item={item}
                        heading1={heading1}
                        heading2={heading2}
                        heading3={heading3}
                        body1={body1}
                        body2={body2}
                        trashFunction={trashFunction}
                        />
                    </div>
                )
                
            })}
        </div>
        </>
    )
    
        
}