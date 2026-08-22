import "./DisplayCard.css";
import { useState } from "react";

export function DisplayCard({content,type})
{
    const colors = [
        "#00e5ff",
        "#ff66c4",
        "#ffd166",
        "#a78bfa",
        "#4ade80",
        "#fb7185"
    ];

    const codes = {1:"Holiday",2: "Exam",3:"Sunday"}

    const [textColor] = useState(
        colors[Math.floor(Math.random() * colors.length)]
    );

    return(
        <div className={`display-card display-card-${type}`}>
            <div
                className="display-card-content"
                style={{color:textColor}}
            >
                {content}
            </div>
            <div className="display-card-type">
                {codes[type]}
            </div>
        </div>
    );
}