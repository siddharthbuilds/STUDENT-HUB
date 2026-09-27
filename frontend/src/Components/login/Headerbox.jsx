import "./Headerbox.css"

export function Headerbox()
{
    return(
        <header className="div-header">
            <div className="header-brand">
                <div className="header-title">Student Hub</div>

                <div className="header-slogan">
                    <span>Plan</span>
                    <span>Track</span>
                    <span>Achieve</span>
                </div>
            </div>

            <div className="header-description">
                Manage all your academic essentials in one place !
            </div>

            <div className="header-status">
                <span className="header-dot"></span>
                <span>Version 1.0</span>
            </div>
        </header>
    )
}