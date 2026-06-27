import {Input} from "../Components/login/Input.jsx"
import "./AddSemPage.css"
import { AddCourse } from "../Components/addsem/AddCourse.jsx"
import { ButtonLogin } from "../Components/login/ButtonLogin.jsx"
export function AddSemPage()
{
    return(
        <>
            <div className="div-addsem-page">
                <div className="div-option-cancel-addsem">
                    <ButtonLogin text="Cancel" bad={true} />
                </div>
                <div className="div-option-save-addsem">
                    <ButtonLogin text="Save" bad={false} />
                </div>
                <div>
                   <Input placeholder="Semester Label (eg: Semester 1)" 
                    type="text"
                    fontSize="30"
                    backgroundColor="#12193A"
                    /> 
                </div>
                <div className="div-addsem-dates">
                    <div className="div-addsem-eachdate">
                        <Input placeholder="Start Date" 
                        type="date"
                        fontSize="23"
                        backgroundColor="#12193A"
                        />
                        <div>Semester Start Date </div>
                    </div>
                    <div className="div-addsem-eachdate">
                        <Input placeholder="End Date" 
                        type="date"
                        fontSize="23"
                        backgroundColor="#12193A"
                        />
                        <div>Semester End Date </div>
                    </div>
                </div>
                <div>
                    <AddCourse />
                </div>
            </div>
            
            
        </>
    )
}