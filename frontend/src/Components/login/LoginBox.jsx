import { Password } from "./Password";
import { Input } from "./Input";
import { ButtonLogin } from "./ButtonLogin";
import "./LoginBox.css";
import { useState } from "react";
import { Link } from "react-router";

export function LoginBox({
    setLoginId,
    loginPassword,
    setLoginPassword,
    buttonActivity,
    demoActivity,
    demoLoading
}) {
    const [capsCheck, setCapsCheck] = useState(false);

    return (
        <div className="div-login">
            <div className="div-login-txt1">
                Login to your Account!
            </div>

            <Input
                placeholder="Account ID"
                type="text"
                setCapsCheck={setCapsCheck}
                onChange={setLoginId}
            />

            <Password
                capsCheck={capsCheck}
                setCapsCheck={setCapsCheck}
                onChange={setLoginPassword}
                currentPassword={loginPassword}
            />

            <ButtonLogin
                text="Log In"
                onClick={buttonActivity}
            />

            <button
                type="button"
                className="btn-demo"
                onClick={demoActivity}
                disabled={demoLoading}
            >
                <span className="btn-demo-title">
                    {demoLoading ? "Starting demo..." : "Just Try Student Hub"}
                </span>

                <span className="btn-demo-subtitle">
                    No account required
                </span>
            </button>

            <Link
                to="/register"
                style={{ color: "inherit", textDecoration: "none" }}
            >
                <div className="div-login-txt2">
                    New User? Register
                </div>
            </Link>
        </div>
    );
}