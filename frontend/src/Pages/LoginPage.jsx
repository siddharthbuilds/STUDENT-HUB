import { Headerbox } from "../Components/login/Headerbox";
import { LoginBox } from "../Components/login/LoginBox";
import { useNavigate } from "react-router";
import { login, startDemoSession } from "../../api/authApi";
import { useState } from "react";
import { TopBarLoader } from "../Components/Loader";
import { ErrorMessage } from "../Components/ErrorMessage";
import { useLocation } from "react-router";
import { Toast } from "../Components/register/Toast";

export function LoginPage() {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();

    async function onClickLogin() {
        setShowLoader(true);
        setError('');
        try {
            const [response] = await Promise.all(
                [login({ userId: loginId, password: loginPassword })
                ]);
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/user");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setShowLoader(false);
        }
    }

    async function onClickDemo() {
        setShowLoader(true);
        setError('');
        try {
            const response = await startDemoSession();
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("isDemoSession", "true");
            navigate("/user");
        } catch (err) {
            setError(err.response?.data?.message || "Could not start demo session");
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
                demoActivity={onClickDemo}
                demoLoading={showLoader}
            />
            
            </div>
            <ErrorMessage message={error} onDismiss={() => setError('')} />
            {location.state?.message && <Toast message={location.state.message} show={true} /> }
        </>
    );
}
