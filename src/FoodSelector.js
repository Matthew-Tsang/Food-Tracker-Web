import React, { useState, useEffect } from 'react';
import FoodListItemAdder from "./FoodListItemAdder";
import "./FoodList.css";
import "./App.css";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';

function FoodSelector() {

    const { listId } = useParams();
    const navigate = useNavigate();
    const handleRouting = (route) => {
        navigate(route);
    };

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
        fetch('http://localhost:3001/api/foods/sorted',
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
        
        const FoodSelector = () =>
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
                                return <FoodListItemAdder name={item.name} quantity={item.grams} key={count++} carbs={item.carbs} protein={item.protein} kcal={item.calories} cholesterol={item.cholesterol} fat={item.fat} fiber={item.fiber} sodium={item.sodium} sugar={item.sugar} listId={listId} cost={item.cost}/>;
                            })}
                            </ul>
                        </div>
                        <button class="button" id="create-fooditem-btn" onClick={() => handleRouting(`/mealplan/${listId}`)}>Return to list</button>
                    </div>
                    </div>
                )
            }
        }

    return(
        <FoodSelector />
    )
}

export default FoodSelector;

