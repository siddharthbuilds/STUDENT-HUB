import "./DashBoard.css";
import attendanceImage from "../../images/attendance-icon.webp"
import pybImage from "../../images/wink.webp"
import marksImage from "../../images/marks.webp"
export function DashBoard()
        {
            return(
                <>
                <div className="div-dashboard">
                    <div className="div-option">
                        <button className="btn-dashboard">
                            <div>
                                <img src={attendanceImage} className="img-dashboard"/>
                            </div>
                            <div>
                                Attendance
                            </div>
                                
                        </button>

                         <button className="btn-dashboard">
                            <div>
                                <img src={pybImage} className="img-dashboard"/>
                            </div>
                            <div>
                                Plan Your Bunks
                            </div>
                        </button>

                        <button className="btn-dashboard">
                            <div>
                                <img src={marksImage} className="img-dashboard"/>
                            </div>
                            <div>
                                Marks
                            </div>
                        </button>
                    </div>
                </div>
                </>
            )
        }