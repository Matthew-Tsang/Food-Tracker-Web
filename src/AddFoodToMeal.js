import React, { useState, useEffect } from 'react';
import FoodListItem from "./FoodListItem";
import "./FoodList.css";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Sidebar } from './Sidebar';

function FoodList() {

    const navigate = useNavigate();
    const handleRouting = (route) => {
        navigate(route);
    };

    const [items, setItems] = useState();

    useEffect(() =>
    {
        getItems();
    }, []);

        async function getItems()
        {
            try
            {
                const res = await fetch('http://localhost:3001/api/foods',
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
        
        const FoodList = () =>
        {
            if(!items)
            {
                return;
            } else {
                var count = 0;
                return(
                    <div>
                        <Sidebar />
                    <div id="foodlist-page-container">
                        <h2>Add Food Items</h2>
                        <div id="foodlist-wrapper">
                            <ul id="foodlist">
                            {items.foodItems.map((item) => {
                                return <FoodListItem name={item.name} quantity={item.grams} key={count++} carbs={item.carbs} protein={item.protein} kcal={item.calories} cholesterol={item.cholesterol} fat={item.fat} fiber={item.fiber} sodium={item.sodium} sugar={item.sugar} />;
                            })}
                            </ul>
                        </div>
                        <button id="add-fooditem-btn" onClick={() => handleRouting("/createfood")}>Submit</button>
                    </div>
                    </div>
                )
            }
        }

    return(
        <FoodList />
    )
}

export default FoodList;

