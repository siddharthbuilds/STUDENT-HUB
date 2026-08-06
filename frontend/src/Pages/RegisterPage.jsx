import { Input } from "../Components/login/Input";
import { Password } from "../Components/login/Password";
import {ButtonLogin} from "../Components/login/ButtonLogin";
import { Headerbox } from "../Components/login/Headerbox";
import { Toast } from "../Components/register/Toast";
import { useState } from "react";
import "./RegisterPage.css";
import { register } from "../../api/authApi";
import { useNavigate } from "react-router";
export function RegisterPage()
{
    const navigate = useNavigate();
    const [toastView,setToastView] = useState(false);
    const [capsCheck, setCapsCheck] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId,setUserId] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    async function onClickRegister()
    {
        try{
            await register ({userId, userName, email, password});
            setToastView(true);
            await setTimeout(()=>{navigate("/login")},2000);
        }
        
            catch(err){
                console.log(err.response.data.message);
            }
    }
    return(
        <>
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
            
        </div>
        <Toast message="Account Registered Successfully!" show={toastView}/>
        </>
    )
}