import "./SemesterHint.css";
import { MousePointerClick } from "lucide-react";

export function SemesterHint()
{
    return(
        <div className="semester-hint">
            <div className="semester-hint-icon">
                <MousePointerClick size={21}/>
            </div>

            <div className="semester-hint-content">
                <div className="semester-hint-title">
                    Explore your semester
                </div>

                <div className="semester-hint-text">
                    Click on a semester to view its details, attendance and plan your bunks.
                </div>
            </div>
        </div>
    );
}