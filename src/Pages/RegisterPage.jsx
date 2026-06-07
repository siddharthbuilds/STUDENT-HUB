import { Input } from "../Components/login/Input"
import { Password } from "../Components/login/Password"
import {ButtonLogin} from "../Components/login/ButtonLogin"
import { Headerbox } from "../Components/login/Headerbox"
import { useState } from "react"
import "./RegisterPage.css"
export function RegisterPage()
{
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
            <ButtonLogin text="Register" />
        </div>
        
        </>
    )
}