import "./EntryCardContainer.css"
import { EntryCard } from "./EntryCard.jsx"
export function EntryCardContainer(
    {data,items,trashFunction}
    )
{
   
    return(
        <>
        <div className="div-course-list">
            {data&&data.map((element)=>{
                return(
                    <div key={element.uuid}>
                    <EntryCard
                        data={element}
                        items={items}
                        trashFunction={trashFunction}
                        />
                    </div>
                )
                
            })}
        </div>
        </>
    )
    
        
}