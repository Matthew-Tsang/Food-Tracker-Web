import React, { useEffect, useState } from "react";
import "./App.css";
import "./Profile.css";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar } from './Sidebar';
import ProfileItem from "./ProfileItem";

function Profile()
{
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() =>
    {
        getItems();
    }, []);

    async function getItems()
    {
        try
        {
            const res = await fetch('http://localhost:3001/api/profiles',
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            const data = await res.json();

            setItems(data);
        }
        catch (err)
        {
            console.error(err);
        }
    }

    function handleLogout()
    {
        fetch('http://localhost:3001/auth/logout',
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then((res)=> {
            if(res.status === 200)
            {
                navigate("/");
            }
            else
            {
                throw new Error("there was an error logging out");
            }
        })
    }

    if (!items) {
        return;
    } else {
        return(
            <div>
                <Sidebar />
            <div className="Profile">
                <h2 align="center">Dashboard</h2>
                {/* <p align="center">{items.picture}</p> */}
                <table className="table-style">
                    <tbody className="table-body">
                        <ProfileItem category="Name" value={items.name}/>
                        <ProfileItem category="Height" value={items.height}/>
                        <ProfileItem category="Carbs" value={items.carbs}/>
                        <ProfileItem category="Protein" value={items.protein}/>
                        <ProfileItem category="Fat" value={items.fat}/>
                    </tbody>
                </table>
                <Link to = {"/settings"}>
                    <button class="button">Settings</button>
                    </Link>
                <button class="button" id="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            </div>
        )
    }
}

export default Profile;