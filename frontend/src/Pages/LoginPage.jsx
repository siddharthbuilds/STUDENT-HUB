import { Headerbox } from "../Components/login/Headerbox";
import { LoginBox } from "../Components/login/LoginBox";
import { useNavigate } from "react-router";
import { login } from "../../api/authApi";
import { useState } from "react";
import { TopBarLoader } from "../Components/Loader";

export function LoginPage() {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [error, setError] = useState('');

    function wait(ms) 
    {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function onClickLogin() {
        setShowLoader(true);
        setError('');
        try {
            const [response] = await Promise.all(
                [login({ userId: loginId, password: loginPassword }),
                    wait(5000),
                ]);
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/user");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setShowLoader(false);
        }
    }

    return (
        <>
            <TopBarLoader active={showLoader} 
                height={20} colorStart="#22d3ee" colorEnd="#a855f7"
                />
            <Headerbox />
            <div style={{display:"flex", justifyContent:"center"}}>
            <LoginBox
                loginId={loginId}
                loginPassword={loginPassword}
                setLoginId={setLoginId}
                setLoginPassword={setLoginPassword}
                buttonActivity={onClickLogin}
            />
            </div>
            {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        </>
    );
}