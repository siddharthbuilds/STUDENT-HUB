import { Password } from "./Password"
import { Input } from "./Input";
import { ButtonLogin } from "./ButtonLogin";
import "./LoginBox.css"
import { useState } from "react";
import { Link } from "react-router";
export function LoginBox({setLoginId, loginPassword, 
                setLoginPassword,buttonActivity})
{
        function trackLoginId(event)
        {
            setLoginId(event.target.value);
        }

        function trackLoginPassword(event)
        {
            setLoginPassword(event.target.value);
        }

        const [capsCheck, setCapsCheck] = useState(false);
        return(
            <div className="div-login">
                <div className="div-login-txt1">
                    Login to your Account!
                </div>

                <Input placeholder="Account ID"
                     type="text" setCapsCheck={setCapsCheck} 
                     onChange={trackLoginId}
                    />

                <Password capsCheck={capsCheck} setCapsCheck={setCapsCheck} 
                        onChange={trackLoginPassword} currentPassword={loginPassword}/>
                
                <ButtonLogin text="Log In" onClick={buttonActivity}/>
                
                <Link to="/register">
                    <div className="div-login-txt2">
                        New User? Register
                    </div>
                </Link>
                
            </div>
        )
    }