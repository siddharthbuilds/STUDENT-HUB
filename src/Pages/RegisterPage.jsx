import { Input } from "../Components/login/Input"
import { Password } from "../Components/login/Password"
import {ButtonLogin} from "../Components/login/ButtonLogin"
import { Headerbox } from "../Components/login/Headerbox"
import { Toast } from "../Components/register/Toast"
import { useState } from "react"
import "./RegisterPage.css"
export function RegisterPage()
{
    const [toastView,setToastView] = useState(false);
    const [capsCheck, setCapsCheck] = useState(false);
    return(
        <>
        <Headerbox />
        <div className="div-register">
            
            <div className="div-register-txt1">
                Register Now!
            </div>
            <Input placeholder="Enter Your Name" type="text" setCapsCheck={setCapsCheck}/>
            <Input placeholder="Enter Your Account ID" type="text" setCapsCheck={setCapsCheck} />
            <Input placeholder="Enter Your Email ID" type="email" setCapsCheck={setCapsCheck}/>
            <Password capsCheck={capsCheck} setCapsCheck={setCapsCheck}/>
            <ButtonLogin text="Register" 
            onClick={()=>{
                setToastView(true);
                setTimeout(()=>{setToastView(false)},3000)
            }}
            />
            
        </div>
        <Toast message="Account Registered Successfully!" show={toastView}/>
        </>
    )
}