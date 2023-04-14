import React, { useState, useEffect } from "react";
import "./ProfileItem.css";
import "./App.css";

const FoodEditableItem = ({category, value, foodId, listId}) => {

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

    function submit(cat, value, id, lid) {
        hideTextField();
        // make requests here
        switch(cat)
        {
            case 'Name':
                console.log("here");
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'name': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Grams':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'grams': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Carbs':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'carbs': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Protein':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'protein': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Calories':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'calories': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Fiber':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'fiber': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Sodium':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'sodium': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Cholesterol':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'cholesterol': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Sugar':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'sugar': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Cost':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'cost': value,
                        'foodId': id,
                        'listId': lid,
                    })
                })
                return;
            case 'Fat':
                fetch('http://localhost:3001/api/foods/items',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'fat': value,
                        'foodId': id,
                        'listId': lid,
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
        <tr className="profile-item" onClick={submitClick}>
            <th className="th-style">{category}</th>
            <td className="td-style">
                <p>{val}</p>
            </td>
        </tr>
    )

    const editing = (
        <tr className="profile-item">
            <th className="th-style">{category}</th>
            <td className="td-style">
                <input type="text" id="edit-input" autoFocus onChange={handleInputChange} defaultValue={val} onBlur={() => submit(category, val, foodId, listId)}></input>
            </td>
        </tr>
    )
    if (isEditing) {
        return editing;
    } else {
        return notEditing;
    }
}

export default FoodEditableItem;