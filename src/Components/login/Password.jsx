import { useState } from "react";
import "./Password.css"
import viewImage from "../../images/view.png";
import hideImage from "../../images/hide.png";

export function Password({capsCheck,setCapsCheck})
        {
            const [currentPassword,setCurrentPassword] = useState('');
            const [viewPassWord,setViewPassWord] = useState(false);
            // const [capsCheck, setCapsCheck] = useState(false);
            function toggleView()
            {
                if (viewPassWord) 
                {
                    setViewPassWord(false);
                }
                else {
                    setViewPassWord(true);
                }
            }
            function checkCapsLock(event)
            {
                 setCapsCheck(event.getModifierState("CapsLock"));
            }
            return(
                <>
                <div className="div-password">
                    
                    <input placeholder="Password" 
                        size="25" className="input-login" 
                        type={viewPassWord?"text":"password"} 
                        name="password"
                        onChange={(event)=>{
                            setCurrentPassword(event.target.value)
                        }}
                        value={currentPassword}
                        onKeyDown={(event)=>{
                            checkCapsLock(event);
                        }}
                        onClick={(event)=>{
                            checkCapsLock(event);
                        }}
                        />
                
                    {currentPassword.length>0 && 
                    <button type="button" className="btn-password-toggle" onClick={toggleView}>
                        <img className="img-btn-password-toggle" 
                        src={viewPassWord? viewImage: hideImage }
                        /> 
                    </button>
                    }
                    
                </div>
                {capsCheck && <div> Caps Lock is turned on!!</div>}
                </>
            
            )
        }