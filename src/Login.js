import React, { useState } from "react";
import "./App.css";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

function Login()
{
    const navigate = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword] =  useState('');

    function handleLogin(e)
    {
        fetch('http://localhost:3001/auth/login',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email,
                'password': password
            })
        })
        .then((res) => {
            if(res.status >= 401)
            {
                window.alert("Email and/or password is incorrect!");
                throw new Error("Email and/or password is incorrect!");
            }
            else if(res.status === 400)
            {
                window.alert("There was an error logging in");
                throw new Error("there was an error logging in");
            }
            else
            {
                navigate("/profile");
            }
        });
    }

    return(
        <div className="App" id="login-app">
            <div className="login">
                <h1>Login</h1>
                <input 
                    className="login-input"
                    type="text" 
                    placeholder="Email..." 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    />
                <input 
                    className="login-input"
                    type="password" 
                    placeholder="Password..." 
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button class="button" onClick={handleLogin}> Login </button>
            </div>
            <Link to = {"/register"}><button class="button"> Register</button></Link>
        </div>
    );
}

export default Login;