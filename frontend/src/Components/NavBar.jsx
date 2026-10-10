import "./NavBar.css";
import {House,LayoutList,Percent,LogOut} from "lucide-react";
import {NavLink} from "react-router";
import { useNavigate } from "react-router";
export function NavBar()
{
    const navigate = useNavigate();
    const isDemo = localStorage.getItem("isDemoSession") === "true";
    const links = [
                {
                    path: "/user/home",
                    text: "Home",
                    icon: House
                },
                {
                    path: "/user/semesters",
                    text: "Semesters",
                    icon: LayoutList
                },
                {
                    path: "/user/grades",
                    text: "Grades",
                    icon: Percent
                }
            ];
    return(
        <>
        <nav className="nav">
        {isDemo && <div className="demo-session-label">Demo session</div>}
        <ul className="links">
        {links.map(({path, text, icon}) => {
    const Icon = icon;

    return (
                <NavLink
                    to={path}
                    key={path}
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}
                    className={({ isActive }) =>
                        isActive ? "links-list filled" : "links-list"
                    }
                >
                    <li className="links-list">
                        <div>
                            <Icon size="18px" />
                        </div>

                        <div>
                            {text}
                        </div>
                    </li>
                </NavLink>
            );
        })}
                    <li className="links-list"
                        onClick={()=>{
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("isDemoSession");
                            navigate('/login');
                        }}
                    >
                        <div>
                            <LogOut size="18px"/>
                        </div> 
                        <div>
                            {isDemo ? "Exit demo" : "Logout"}
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}
