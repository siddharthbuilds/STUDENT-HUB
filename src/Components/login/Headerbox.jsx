import "./Headerbox.css"
import logoImage from "../../images/logo1.png"
export function Headerbox()
        {
        return(
            <div className="div-header">
                <div>
                    <img src={logoImage} className="img-header-logo" />
                </div>

                <div>
                    Student Hub
                    <div className="div-header-slogan"> Plan <span className="dot">.</span> Track <span className="dot">.</span> Achieve</div>
                </div>

                <div>
                    Version 1.0
                </div>
    
            </div>
        )
    }