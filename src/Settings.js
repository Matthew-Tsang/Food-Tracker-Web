import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar } from './Sidebar';

function Settings()
{

    const[showForm, setShowForm] = useState(false);
    const[showForm2, setShowForm2] = useState(false);
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[items, setItems] = useState([]);

    useEffect(()=>
    {
        getItems();
    }, []);

    async function getItems()
    {
        try
        {
            const res = await fetch('http://localhost:3001/auth/user',
            {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();

            setItems(data);
        }
        catch (err)
        {
            console.error(err);
        }
    }

    const showFormFunc = () => {
        setShowForm(!showForm);
    }
    const showFormFunc2 = () => {
        setShowForm2(!showForm2);
    }

    function handleSubmit(e)
    {
        fetch('http://localhost:3001/auth/resetpw',
        {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'password': password
            })
        })
        .then((res) => {
            if(res.status >= 400)
            {
                throw new Error("there was an error resetting password");
            }
            else
            {
                window.alert("Password has been reset!");
            }
        })
    }
    function handleEmail(e)
    {
        fetch('http://localhost:3001/auth/resetemail',
        {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email
            })
        })
        .then((res) => {
            if(res.status === 401)
            {
                window.alert("That email is already associated with another account");
                throw new Error("email's associated account already exists");
            }
            else if(res.status >= 400)
            {
                window.alert("There was an error changing the email");
                throw new Error("there was an error changing the email");
            }
            else
            {
                window.alert("Email has been updated!");
            }
        })
    }

    return(
        <div>
            
        <Sidebar/>
        <div className="Settings">
            <div className="ResetEmail">
                <p>Current email: {items.email}</p>
                <button class="button" onClick={showFormFunc2}>Update Email</button>
                {showForm2 && (
                    <form onSubmit={handleEmail}>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter new Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button class="button">Submit</button>
                    </form>
                )}
            </div>
            <div className="ResetEmail">
                <button class="button" onClick={showFormFunc}>Reset Password</button>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button class="button">Submit</button>
                    </form>
                )}
            </div>
            <div className="dash">
                <Link to = {"/profile"}><button class="button">Return to Dashboard</button></Link>
            </div>
        </div>
        </div>
    )
}

export default Settings;