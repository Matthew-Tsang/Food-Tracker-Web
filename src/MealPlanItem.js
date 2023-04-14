import React, { useState, useEffect } from 'react';
import "./MealPlanItem.css";
import "./App.css";
import { faPen } from '@fortawesome/free-solid-svg-icons'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const MealPlanItem = ({ name, totalCal, listId, items, top3Foods }) => {

    const navigate = useNavigate();
    const[isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    function deleteReq(id)
    {
        fetch('http://localhost:3001/api/meals',
        {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'listId': id
            })
        }).then(navigate(0));
    }

    const handleRouting = (route) => {
        navigate(route);
    };

    const top3foodItems = <div id="top3foods">
    {top3Foods.map((item) => {
        return <p>{item.name}&nbsp;</p>
    })}
</div>;
    const allItems = <div id="allFoods">
    {items.map((item) => {
        return <p>{item.name}&nbsp;</p>
    })}
</div>;

    return (
        <li className={isExpanded ? "mealplan-item-expanded" : "mealplan-item"} onClick={() => toggleExpand()}>
            <div id="item-left-half" className="mealplan-half">
                <h6>{name}</h6>
                <p>{totalCal} kCal <FontAwesomeIcon icon={faCaretDown} size='xs' onClick={() => toggleExpand()}/></p>
                {isExpanded ? allItems : top3foodItems}
            </div>
            <div id="item-right-half-meal" className="mealplan-half">
                <FontAwesomeIcon icon={faPen} className="btn1" onClick={() => handleRouting(`/mealplan/${listId}`)}/>
                <FontAwesomeIcon icon={faTrash} id="delete-fooditem" className="btn1 delete-food-item-btn" onClick={() => deleteReq(listId)}/>
            </div>
           
        </li>
    )
}

export default MealPlanItem;
