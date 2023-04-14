import React, { useState, useEffect } from "react";
import "./ProfileItem.css";
import "./App.css";

const ProfileItem = ({category, value}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [val, setVal] = useState('')
    const [first, setFirst] = useState(false)

    const submitClick = event => {
        if (event.detail === 2) {
          setIsEditing(true);
        }
      };

    useEffect(() =>
    {
        if(first && val)
        {
            return;
        }
        else
        {
            setVal(value);
            setFirst(true);
        }
    })

    const handleInputChange = (e) =>{
        setVal(e.target.value);
    }

    function submit(cat, value) {
        hideTextField();
        // make requests here
        switch(cat)
        {
            case 'Name':
                console.log("here");
                fetch('http://localhost:3001/api/profiles',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'name': value,
                    })
                })
                return;
            case 'Height':
                fetch('http://localhost:3001/api/profiles',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'height': value,
                    })
                })
                return;
            case 'Carbs':
                fetch('http://localhost:3001/api/profiles',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'carbs': value,
                    })
                })
                return;
            case 'Protein':
                fetch('http://localhost:3001/api/profiles',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'protein': value,
                    })
                })
                return;
            case 'Fat':
                fetch('http://localhost:3001/api/profiles',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'fat': value,
                    })
                })
                return;
            default:
                return;
        }
    }

    function hideTextField() {
        setIsEditing(false);
    }

    const notEditing = (
        <tr className="profile-item">
            <th className="th-style">{category}</th>
            <td className="td-style" onClick={submitClick}>
                <p>{val}</p>
            </td>
        </tr>
    )

    const editing = (
        <tr className="profile-item">
            <th className="th-style">{category}</th>
            <td className="td-style">
                <input type="text" autoFocus onChange={handleInputChange} defaultValue={val} onBlur={() => submit(category, val)}></input>
                {/* <button onClick={() => submit(category, val)}>Submit</button> */}
            </td>
        </tr>
    )
    if (isEditing) {
        return editing;
    } else {
        return notEditing;
    }
}

export default ProfileItem;