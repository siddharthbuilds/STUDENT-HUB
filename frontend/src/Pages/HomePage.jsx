import "./HomePage.css"
import { ButtonLogin } from "../Components/login/ButtonLogin"
import { SemesterBox } from "../Components/home/SemesterBox"
export function HomePage()
{
    return(
        <>
        <div className="div-all-semesters">
            <div> Your Semesters</div>
            <SemesterBox name="Semester 1" 
                from="August 2025"
                to="December 2025"
            />
            <SemesterBox name="Semester 2" 
                from="January 2026"
                to="May 2026"
            />
            <SemesterBox name="Semester 3" 
                from="July 2026"
                to="December 2026"
            />

            <ButtonLogin text="Add Semester" />
        </div>
        </>
    )
}