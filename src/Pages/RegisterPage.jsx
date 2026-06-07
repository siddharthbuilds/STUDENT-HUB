import { Input } from "../Components/login/Input"
import { Password } from "../Components/login/Password"
import {ButtonLogin} from "../Components/login/ButtonLogin"
import "./RegisterPage.css"
export function RegisterPage()
{
    return(
        <>
        <div className="div-register">
            <Input placeholder="Enter Your Name" type="text"/>
            <Input placeholder="Enter Your Account ID" type="text" />
            <Input placeholder="Enter Your Email ID" type="email"/>
            <Password />
            <ButtonLogin text="Register" />
        </div>
        
        </>
    )
}