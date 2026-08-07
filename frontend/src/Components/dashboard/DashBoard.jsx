import "./DashBoard.css";
import {useNavigate} from "react-router"
export function DashBoard({options})
        {
            const navigate = useNavigate();
            return(
                <>
                <div className="div-dashboard">
                    <div className="div-option">
                        {options&&options.map(option=>{
                            return(
                                <>
                                    <button 
                                        className="btn-dashboard"
                                        onClick={()=>{navigate(option.navigate)}}
                                    >
                                        <div>
                                            <img src={option.image} 
                                            className="img-dashboard"/>
                                        </div>
                                        <div>
                                            {option.text}
                                        </div>
                                            
                                    </button>
                                </>
                            )
                        })}
                    </div>
                </div>
                </>
            )
        }