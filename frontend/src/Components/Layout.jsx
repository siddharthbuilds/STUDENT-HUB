import { Outlet} from "react-router";
import { NavBar } from "./NavBar";
import "./Layout.css";

export function MainLayout() {
    return (
        <div className="main-layout">
            <NavBar/>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}