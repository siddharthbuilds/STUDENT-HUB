import { Navigate, Outlet } from "react-router";

export function ProtectedRoute()
{
    const token = localStorage.getItem("accessToken");
    if(token&& token !== "undefined" && token !== "null")
    {
        return <Outlet />;
    }
    return <Navigate to="/register" />;
}