import "./CourseBox.css"
import { Input } from "../login/Input.jsx"
import {ButtonLogin} from "../login/ButtonLogin.jsx"
export function CourseBox()
{
    return(
        <>
        <div className="div-course-box">
            <div className="div-course-attributes">
                <Input placeholder="Course Name"/>
                <Input placeholder="Credits" size="3"/>
            </div>
            <div>
                <ButtonLogin text="Add" />
            </div>
        </div>
        </>
    )
}