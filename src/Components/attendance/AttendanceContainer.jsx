import "./AttendanceContainer.css"
import {AttendanceDetails} from "./AttendanceDetails"
export function AttendanceContainer(){
    return(
        <div className="div-attendance-container">
            <AttendanceDetails 
                course="CPP"
                total="40"
                present="35"
                absent="5"
                bunks="8"
                percentage="87.5"
            />
            <AttendanceDetails 
                course="Maths"
                total="59"
                present="51"
                absent="8"
                bunks="4"
                percentage="72"
            />

            <AttendanceDetails 
                course="Java"
                total="52"
                present="40"
                absent="12"
                bunks="0"
                percentage="65"
            />
        </div>
    )
}