import { Input } from "../Components/login/Input";
import { Password } from "../Components/login/Password";
import {ButtonLogin} from "../Components/login/ButtonLogin";
import { Headerbox } from "../Components/login/Headerbox";
import { Toast } from "../Components/register/Toast";
import { useState } from "react";
import "./RegisterPage.css";
import { register, startDemoSession } from "../../api/authApi";
import { useNavigate } from "react-router";
import {PageLoader} from "../Components/Loader";
import { ErrorMessage } from "../Components/ErrorMessage";
import { Link } from "react-router";


export function RegisterPage()
{
    const navigate = useNavigate();
    const [toastView,_setToastView] = useState(false);
    const [capsCheck, setCapsCheck] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId,setUserId] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showLoader,setShowLoader] = useState(false);
    const [error, setError] = useState('');
    const [demoLoading, setDemoLoading] = useState(false);

    async function onClickDemo() {
        setDemoLoading(true);
        setError('');
        try {
            const response = await startDemoSession();
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("isDemoSession", "true");
            navigate("/user");
        } catch (err) {
            setError(err.response?.data?.message || "Could not start demo session");
        } finally {
            setDemoLoading(false);
        }
    }


    async function onClickRegister()
    {
        setShowLoader(true);
        setError('');
        try{
            await Promise.all([register ({userId, userName, email, password})
            ]);
            navigate("/login",{state: {
            message: "Registration successful! Please login."
        }});
        }
            catch(err){
                setError(err.response?.data?.message || "Registration failed");
            }
            finally{
                setShowLoader(false);
            }
    }
    return(
        <>
        {showLoader&& <PageLoader/>}
        {!showLoader&& <>
            <Headerbox />
        <div className="div-register">
            
            <div className="div-register-txt1">
                Register Now!
            </div>
            <Input placeholder="Enter Your Name" 
                type="text" setCapsCheck={setCapsCheck}
                onChange={setUserName} />
            <Input placeholder="Enter Your User ID" 
                type="text" setCapsCheck={setCapsCheck} 
                onChange={setUserId}    />
            <Input placeholder="Enter Your Email ID" 
                type="email" setCapsCheck={setCapsCheck}
                onChange={setEmail}    />
            <Password currentPassword={password}
                capsCheck={capsCheck} setCapsCheck={setCapsCheck}
                onChange={setPassword }/>
            <ButtonLogin text="Register" 
            onClick={onClickRegister}
            />
            <button
                type="button"
                className="btn-demo"
                onClick={onClickDemo}
                disabled={demoLoading}
            >
                <span className="btn-demo-title">
                    {demoLoading ? "Starting demo..." : "Just Try Student Hub"}
                </span>

                <span className="btn-demo-subtitle">
                    No account required
                </span>
            </button>

        <Link to="/login" 
                    style={{ color: 'inherit', textDecoration: 'none' }}>
                    <div className="div-login-txt2">
                        Already Registered? Login
                    </div>
                </Link>
            
        </div>
        <Toast message="Account Registered Successfully!" show={toastView}/>
            </>
        }
        <ErrorMessage message={error} onDismiss={() => setError('')} />
        </>
    )
}
