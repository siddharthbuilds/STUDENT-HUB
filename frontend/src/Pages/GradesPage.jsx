import "./GradesPage.css";
import { HeaderDashBoard } from "../Components/dashboard/HeaderDashBoard";
import { OverallGradeBox } from "../Components/grades/OverallGradeBox";

export function GradesPage() {
    return (
        <div className="grades-page">
            <HeaderDashBoard />

            <main className="grades-main">
                <OverallGradeBox />
            </main>
        </div>
    );
}