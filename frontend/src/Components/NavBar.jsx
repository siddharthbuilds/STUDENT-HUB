import "./NavBar.css";
import {House,LayoutList,Percent,LogOut} from "lucide-react";
import {Link} from "react-router";
import { useState } from "react";
export function NavBar()
{
    const links = [
                {
                    path: "user/home",
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
        const [section,setSection] = useState("home");
        
        function onClickNav(text)
        {
            setSection(text);
        }
    return(
        <>
        <nav className="nav">
        <ul className="links">
        {links.map(({path,text,icon})=>{
            const Icon = icon;
            return(<>
                    <Link to={path}
                         style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                    <li className={section===text?"links-list filled":"links-list"}
                        onClick={()=>{onClickNav(text)}}
                    >
                        <div>
                            <Icon size="18px"/>
                        </div> 
                        <div>
                            {text}
                        </div>
                    </li>
                    </Link>
            </>)
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