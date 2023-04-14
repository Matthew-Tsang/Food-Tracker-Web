import React, { useState, useEffect } from 'react';
import MealPlanItem from "./MealPlanItem";
import { Sidebar } from './Sidebar';
import "./MealPlanList.css";
import "./App.css";

function calculateTotalCals(item) {
    var sum = 0;
    item.foodItems.forEach(food => {
        let num = parseFloat(food.calories);
        if (!isNaN(num)) {
            sum += num;
        }
    });
    return sum;
}

function getTop3Foods(item) {
    var count = 0;
    var res = [];
    item.forEach(i => {
        if (count >= 3) {
            return res;
        }
        res.push(i);
        count++;
    });
    return res;
}

function CreatePostForm()
{
    const [title, setTitle] = useState('');

    function handleSubmit(e)
    {
        fetch('http://localhost:3001/api/meals',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'title': title
            })
        });
    }

    return (
        <form onSubmit={handleSubmit} id="createMealPlan">
            <input 
                type="text" 
                name="name"
                placeholder="Name..."
                value={title}
                id="textBox"
                onChange={(e) => setTitle(e.target.value)}
                />
                <button class="button">Add Meal Plan</button>
        </form>
    )
}

function MealPlanList() {

    const [items, setItems] = useState([]);

    useEffect(() =>
    {
        getItems();
    }, []);

        async function getItems()
        {
            try
            {
                const res = await fetch('http://localhost:3001/api/meals',
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
    var count = 0;
    if (items) {
        return (
            <div>
                <Sidebar />
                <div id="mealplan-page-container">
                    <div id="meal-plan-header">
                        <div id="meal-plan-left" className="meal-plan-header-half">
                            <h3>List of Meal Plans</h3>
                        </div>
                        <div id="meal-plan-right" className="meal-plan-header-half">
                            <button id="add-meal-btn">
                                <p>+ Add Items</p>
                            </button>
                        </div>
                    </div>
                    <div id="mealplan-list-wrapper">
                        <ul id="mealplan-list">
                            {items.map((item) => {
                                return <MealPlanItem name={item.title} totalCal={calculateTotalCals(item)} items={item.foodItems} top3Foods={getTop3Foods(item.foodItems)} listId={item.id} key={count++}/>
                            })}
                        </ul>
                    </div>
                    <br/>
                    <CreatePostForm />
                </div>
            </div>
        )
    } else {
        return (
                <div>
                <Sidebar />
                <div id="mealplan-page-container">
                    <div id="meal-plan-header">
                        <div id="meal-plan-left" className="meal-plan-header-half">
                            <h3>List of Meal Plans</h3>
                        </div>
                        <div id="meal-plan-right" className="meal-plan-header-half">
                            <button id="add-meal-btn">
                                <p>+ Add Items</p>
                            </button>
                        </div>
                    </div>
                    <div id="mealplan-list-wrapper">
                        <ul id="mealplan-list">
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default MealPlanList;
