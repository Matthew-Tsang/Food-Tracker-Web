import React, { useState } from "react";
import "./App.css";
import { useNavigate, Link } from "react-router-dom";

function Register()
{
    const navigate = useNavigate();

    const[emailReg, setEmailReg] = useState('');
    const[passwordReg, setPasswordReg] =  useState('');

    function handleSubmit(e)
    {
        fetch('http://localhost:3001/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': emailReg,
                'password': passwordReg
            })
        })
        .then((res) => {
            if(res.status === 401)
            {
                window.alert("That email's associated account already exists");
                throw new Error("email's associated account already exists");
            }
            else if(res.status >= 400)
            {
                window.alert("Error occurred while registering");
                throw new Error("there was an error registering");
            }
            else
            {
                window.alert("Registration Successful!");
                navigate("/");
            }
        });
    }

    return(
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Email</label>
                <input 
                    type = "text"
                    className="regInput"
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input 
                    type = "password"
                    className="regInput"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <button onClick={handleSubmit} className="regButton"> Register </button>
            </div>
            <Link to = {"../"}><button className="regButton"> Return to Login</button></Link>
        </div>
    );
}

export default Register;