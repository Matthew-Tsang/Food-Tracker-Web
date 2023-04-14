import React, { useState, useEffect } from 'react';
import "./FoodListItem.css";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodListItemAdder = ({ name, quantity, carbs, protein, fat, fiber, sodium, cholesterol, sugar, kcal, listId, cost }) => {

    const navigate = useNavigate();

    function addReq()
    {
        fetch('http://localhost:3001/api/foods/items',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'listId': listId,
                'name': name,
                'grams': quantity,
                'calories': kcal,
                'carbs': carbs,
                'protein': protein,
                'fat': fat,
                'fiber': fiber,
                'sodium': sodium,
                'cholesterol': cholesterol,
                'sugar': sugar,
                'cost': cost,
            })
        })
        .then((res) =>
        {
            if(res.status >= 400)
            {
                window.alert("Error adding food item");
                throw new Error("error adding food item");
            }
            else
            {
                //window.alert("Food item added!");
                notify();
            }
        })
    }

    const notify = () => toast.info('Food item added!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "colored",
        });

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
                <FontAwesomeIcon icon={faPlusCircle} id="delete-fooditem" onClick={() => addReq()}/>
            </div>
            <div>
            <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            theme="colored"
            toastStyle={{backgroundColor: "#4E52BE" }}
            />
            </div>
        </li>
    )
}

export default FoodListItemAdder;
