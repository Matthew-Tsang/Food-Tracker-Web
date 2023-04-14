import React, { useState, useEffect } from 'react';
import FoodListItem from "./FoodListItem";
import "./FoodList.css";
import "./App.css";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from './Sidebar';
import ElementMaker from "./ElementMaker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowDownShortWide, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';


function MealPlan() {

    const { listId } = useParams();
    const navigate = useNavigate();
    const handleRouting = (route) => {
        navigate(route);
    };

    const [mealName, setMealName] = useState("");
    const [showInputEle, setShowInputEle] = useState(false);
    const [items, setItems] = useState();
    const [first, setFirst] = useState(false);

    const[isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const[sortvalue, setSortvalue] = useState("name");
    const[ascvalue, setAscvalue] = useState(true);
    const handleChange = (event) => {
        setSortvalue(event.target.value);
        handleSort(event.target.value, ascvalue);
    };

    const reverseSort = () =>
    {
        handleSort(sortvalue, !ascvalue);
        setAscvalue(!ascvalue);
    } 

    const handleSort = (sortby, asc) => {

        var ascValue = 'false'
        if(asc)
        {
            ascValue = 'true'
        }
        fetch(`http://localhost:3001/api/meals/${listId}/sorted`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'sortby': sortby,
                'asc': ascValue,
            })
        }).then((res) => {
            res.json().then(data => {
                console.log(data);
                setItems(data);
            })
        })
    }

    useEffect(() =>
    {
        getItems();
    }, []);

        async function getItems()
        {
            try
            {
                const res = await fetch(`http://localhost:3001/api/meals/${listId}`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                const data = await res.json();
                setItems(data);
            }
            catch (err)
            {
                console.error(err);
            }
        }
        
        function handleNameChange()
        {
            setShowInputEle(false);
            fetch('http://localhost:3001/api/meals',
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'listId': listId,
                        'title': mealName
                    })
                })
        }

        const MealPlan = () =>
        {

            useEffect(() =>
            {
                if(!items || first)
                {
                    return;
                }
                else
                {
                    setMealName(items.title);
                    setFirst(true);
                }
            }, []);
            if(!items)
            {
                return;
            } else {
                var count = 0;
                var total_grams = 0;
                var total_carbs = 0;
                var total_protein = 0;
                var total_calories = 0;
                var total_cholesterol = 0;
                var total_fat = 0;
                var total_fiber = 0;
                var total_sodium = 0;
                var total_sugar = 0;
                var total_cost = 0.0;
                

                return(
                    
                    <div>
                        <Sidebar />          
                        <div id="foodlist-page-container">
                            <div>
                            <div>
                            <h2>
                            {/* Invoke the ElementMaker component with some attributes */}
                            <ElementMaker
                            value={mealName}
                            handleChange={(e) => setMealName(e.target.value)}  
                            handleSingleClick={() => setShowInputEle(true)} 
                            handleBlur={() => handleNameChange(false)}         
                            showInputEle={showInputEle}
                            /></h2>
                            </div>
                            </div>
                        {items.foodItems.map((item) => {
                                total_grams += item.grams;
                                total_carbs += item.carbs;
                                total_protein += item.protein;
                                total_calories += item.calories;
                                total_cholesterol += item.cholesterol;
                                total_fat += item.fat;
                                total_fiber += item.fiber;
                                total_sodium += item.sodium;
                                total_sugar += item.sugar;
                                total_cost += item.cost;
                        })} 
                        <div id="total_calories_label" onClick={() => toggleExpand()}>
                            <h6>Calories: {total_calories} Fat: {total_fat} Protein: {total_protein} Carbs: {total_carbs} Cost: {total_cost} <FontAwesomeIcon icon={faCaretDown} size='xs' onClick={() => toggleExpand()}/></h6>
                            {isExpanded &&
                            <h6>
                                Grams: {total_grams} Cholesterol: {total_cholesterol} Fiber: {total_fiber} Sodium: {total_sodium} Sugar: {total_sugar}
                                </h6>}
                            </div>
                        <button class="button" id="create-fooditem-btn" onClick={() => handleRouting(`/mealplan/${listId}/add`)}>Add Food Items</button>
                        <label id="sort">
                            Sort {ascvalue ? <FontAwesomeIcon icon={faArrowDownShortWide} onClick={() => reverseSort()}/> : <FontAwesomeIcon icon={faArrowUpWideShort} onClick={() => reverseSort()}/>}
                            <select value={sortvalue} onChange={handleChange} id="select-dropdown">
                                <option value="name">Name</option>
                                <option value="grams">Grams</option>
                                <option value="calories">Kcal</option>
                                <option value="carbs">Carbohydrates</option>
                                <option value="protein">Protein</option>
                                <option value="fat">Fat</option>
                                <option value="fiber">Fiber</option>
                                <option value="sodium">Sodium</option>
                                <option value="cholesterol">Cholesterol</option>
                                <option value="sugar">Sugar</option>
                                <option value="cost">Cost</option>
                            </select>
                        </label>
                        <div id="foodlist-wrapper">
                            <ul id="foodlist">
                            {items.foodItems.map((item) => {
                                return <FoodListItem name={item.name} quantity={item.grams} key={count++} carbs={item.carbs} protein={item.protein} kcal={item.calories} cholesterol={item.cholesterol} fat={item.fat} fiber={item.fiber} sodium={item.sodium} sugar={item.sugar} foodId={item.id} cost={item.cost} listId={listId} isPlan={true}/>;
                            })}
                            </ul>
                        </div>
                        <div>
                    </div>
                    </div>
                    </div>
                )
            }
        }

    return(
        <MealPlan />
    )
}

export default MealPlan;

