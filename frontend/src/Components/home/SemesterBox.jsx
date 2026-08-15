import "./SemesterBox.css";
import { TrashImage } from "./TrashImage.jsx";

export function SemesterBox({ name, from, to, onClick }) {
    return (
        <div className="div-each-semester">
            <div className="div-text-each-semester">
                <div className="div-text-each-semester-name">
                    {name}
                </div>

                <div className="div-text-each-semester-date">
                    {from} - {to}
                </div>
            </div>

            <div className="div-options-each-semester">
                <button className="btn-options-each-semester">
                    <TrashImage
                        color="white"
                        size="25"
                        onClick={onClick}
                    />
                </button>
            </div>
        </div>
    );
}