import "./Headerbox.css"

export function Headerbox()
{
    return(
        <header className="div-header">
            <div className="header-brand">
                <div className="header-title">
                    Student <span>Hub</span>
                </div>

                <div className="header-slogan">
                    <span>Plan</span>
                    <span>Track</span>
                    <span>Achieve</span>
                </div>
            </div>

            <div className="header-description">
                <span className="description-line"></span>
                <span>Your academic essentials, all in one place</span>
                <span className="description-line"></span>
            </div>

            <div className="header-status">
                <span className="header-dot"></span>
                <span>Version 1.0</span>
            </div>
        </header>
    )
}