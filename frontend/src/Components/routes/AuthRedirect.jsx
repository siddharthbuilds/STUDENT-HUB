import { Navigate } from "react-router";

export function AuthRedirect({ children })
{
    const token = localStorage.getItem("accessToken");

    if(token)
    {
        return <Navigate to="/user/home" replace />;
    }

    return children;
}