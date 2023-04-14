import React, { useEffect, useState } from "react";
import "./App.css";
import "./Profile.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Sidebar } from './Sidebar';
import FoodEditableItem from "./FoodEditableItem";

function FoodItem(isPlan)
{
    const { listId, foodId } = useParams();
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
            const res = await fetch(`http://localhost:3001/api/foods/items/${foodId}`,
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

    if (!items) {
        return;
    } else {
        return(
            <div>
                <Sidebar />
            <div className="edit-food-items">
                <table className="table-style">
                    <tbody className="table-body">
                        <FoodEditableItem category="Name" value={items.name} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Grams" value={items.grams} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Calories" value={items.calories} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Carbs" value={items.carbs} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Protein" value={items.protein} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Fat" value={items.fat} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Fiber" value={items.fiber} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Sodium" value={items.sodium} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Sugar" value={items.sugar} foodId={foodId} listId={listId}/>
                        <FoodEditableItem category="Cost" value={items.cost} foodId={foodId} listId={listId}/>
                    </tbody>
                </table>
                <button class="button" id="create-fooditem-btn" onClick={() => navigate(-1)}>Return to list</button>
            </div>
            </div>
        )
    }
}

export default FoodItem;