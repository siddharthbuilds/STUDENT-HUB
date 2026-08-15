import "./NavBar.css";
import {House,LayoutList,Percent,LogOut} from "lucide-react";
import {NavLink} from "react-router";
export function NavBar()
{
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
                    <li className="links-list">
                        <div>
                            <LogOut size="18px"/>
                        </div> 
                        <div>
                            Logout
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}