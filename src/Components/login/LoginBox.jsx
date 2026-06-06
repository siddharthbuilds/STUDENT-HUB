import { Password } from "./Password"
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

                <div>
                    <input placeholder="Account ID"
                     size="25" 
                     className="input-login" 
                     name="id"
                     onClick={()=>{setCapsCheck(false)}}
                     />
                </div>

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