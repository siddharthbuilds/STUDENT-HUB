import "./NavBar.css";
import {House,LayoutList,Percent,LogOut} from "lucide-react";
export function NavBar()
{
    return(
        <>
           <nav className="nav">
                <ul className="links">
                    <li className="links-list filled">
                        <div>
                            <House size="18px"/>
                        </div> 
                        <div>
                        Home
                        </div>
                    </li>
                    <li className="links-list">
                        <div>
                            <LayoutList size="18px"/>
                        </div> 
                        <div>
                        Semesters
                        </div>
                    </li>
                    <li className="links-list">
                        <div>
                            <Percent size="18px" />
                        </div> 
                        <div>
                        Grades
                        </div>
                    </li>
                    <li className="links-list">
                        <div>
                            <LogOut size="18px" />
                        </div> 
                        <div>
                        Log Out
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}