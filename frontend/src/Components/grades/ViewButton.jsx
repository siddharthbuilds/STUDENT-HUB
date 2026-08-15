import "./ViewButton.css";
import { useState } from "react";
import dropdownImage from "../../images/dropdown.png";
import dropupImage from "../../images/dropup.png";

export function ViewButton({ message, component }) {
    const Component = component;
    const [viewButton, setViewButton] = useState(false);

    function toggleViewButton() {
        setViewButton(!viewButton);
    }

    return (
        <div className="view-course-wrapper">

            <button
                className="btn-viewdetails"
                onClick={toggleViewButton}
            >
                <span>{message}</span>

                <img
                    src={viewButton ? dropupImage : dropdownImage}
                    className="img-dropdown"
                />
            </button>

            {viewButton && (
                <div className="course-details-wrapper">
                    <Component />
                </div>
            )}

        </div>
    );
}