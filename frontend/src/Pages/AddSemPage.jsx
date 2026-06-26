import {Input} from "../Components/login/Input.jsx"
import "./AddSemPage.css"
import { AddCourse } from "../Components/addsem/AddCourse.jsx"
export function AddSemPage()
{
    return(
        <>
            <Input placeholder="Semester Label (eg: Semester 1)" 
            type="text"/>
            <div className="div-addsem-dates">
                <div>
                    <Input placeholder="Start Date" 
                    type="date"/>
                </div>
                <div>
                    <Input placeholder="End Date" 
                    type="date"/>
                </div>
            </div>
            <AddCourse />
            
        </>
    )
}