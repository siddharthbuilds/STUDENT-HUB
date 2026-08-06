import { Navigate, Outlet } from "react-router";

export function ProtectedRoute()
{
    const token = localStorage.getItem("accessToken");
    if(token)
    {
        return <Outlet />;
    }
    return <Navigate to="/" />;
}