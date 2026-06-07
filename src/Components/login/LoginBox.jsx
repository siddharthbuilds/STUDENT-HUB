import { Password } from "./Password"
import { Input } from "./Input";
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

                <Input setCapsCheck={setCapsCheck} />

                <Password capsCheck={capsCheck} setCapsCheck={setCapsCheck} />
                
                <div>
                    <button className="btn-login"> Login </button>
                </div>
                
                <div className="div-login-txt2">
                    New User? Register
                </div>
            </div>
            </form>
        )
    }