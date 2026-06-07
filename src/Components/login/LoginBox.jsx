import { Password } from "./Password"
import { Input } from "./Input";
import { ButtonLogin } from "./ButtonLogin";
import "./LoginBox.css"
import { useState } from "react";
export function LoginBox()
        {
        const [capsCheck, setCapsCheck] = useState(false);
        return(
            <form>
            <div className="div-login">
                <div className="div-login-txt1">
                    Login to your Account!
                </div>

                <Input placeholder="Account ID" type="text" setCapsCheck={setCapsCheck} />

                <Password capsCheck={capsCheck} setCapsCheck={setCapsCheck} />
                
                <ButtonLogin text="Log In" />
                
                <div className="div-login-txt2">
                    New User? Register
                </div>
            </div>
            </form>
        )
    }