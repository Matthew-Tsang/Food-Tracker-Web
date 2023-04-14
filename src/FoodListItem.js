import React, { useState, useEffect } from 'react';
import "./FoodListItem.css";
import "./App.css";
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const FoodListItem = ({ name, quantity, carbs, protein, fat, fiber, sodium, cholesterol, sugar, kcal, foodId, cost, listId, isPlan }) => {

    const navigate = useNavigate();

    function deleteReq(id)
    {
        fetch('http://localhost:3001/api/foods/items',
        {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'foodId': id
            })
        }).then(navigate(0));
    }

    const handleRouting = (route) => {
        navigate(route);
    };

    return(
        <li className="foodlist-item">
            <div id="item-left-half" className="foodlist-half">
                <h5>{name}</h5>
                <p className="fooditem-label">Grams: {quantity} </p>
                <p className="fooditem-label">Carbs: {carbs} Protein: {protein} Fat: {fat} Fiber: {fiber} Sodium: {sodium} Cholesterol: {cholesterol} Sugar: {sugar} Cost: {cost}</p>
            </div>
            <div id="item-right-half" className="foodlist-half">
                <div id="kcal-label-wrapper">
                    <p className="fooditem-label" id="kcal-label">{kcal} kCal</p>
                </div>
            </div>
            <FontAwesomeIcon icon={faPen} className="btn1" onClick={() => (isPlan ? handleRouting(`/mealplan/${listId}/${foodId}`) : handleRouting(`/food/${listId}/${foodId}`))}/>
            <FontAwesomeIcon icon={faTrash} id="delete-fooditem" className="delete-food-item-btn" onClick={() => deleteReq(foodId)}/>
        </li>
    )
}

export default FoodListItem;
