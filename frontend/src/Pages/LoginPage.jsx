import { Headerbox } from "../Components/login/Headerbox";
import { LoginBox } from "../Components/login/LoginBox";
import { useNavigate } from "react-router";
import { login } from "../../api/authApi";
import { useState } from "react";

export function LoginPage()
{
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    async function onClickLogin()
    {
        try{
            const response = await login ({userId: loginId, 
                password: loginPassword});
            
            localStorage.setItem("accessToken",response.data.accessToken);

            navigate("/dashboard");
        }

        catch(err){
            console.log(err.response.data.message);
        }
    }
    return(
        <>
            <Headerbox />
            <LoginBox loginId={loginId} loginPassword={loginPassword}
                    setLoginId={setLoginId} setLoginPassword={setLoginPassword}
                    buttonActivity={onClickLogin}
                    />
        </>
    )
}