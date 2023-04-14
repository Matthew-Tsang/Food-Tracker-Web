import React, { useEffect, useState } from "react";
import "./CreateFoodItem.css";
import "./App.css";
import { Sidebar } from './Sidebar';
import { useNavigate } from "react-router-dom";

function CreateFoodItems() {
    
    const [foodName, setName] = useState('');
    const [grams, setGrams] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [proteins, setProteins] = useState('');
    const [fiber, setFiber] = useState('');
    const [sodium, setSodium] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [sugar, setSugar] = useState('');
    const [cost, setCost] = useState('');
    const [items, setItems] = useState([]);
    
    useEffect(() =>
    {
        getItems();
    }, []);
    const navigate = useNavigate();
    const route = (route) => {
      navigate(route);
  };

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

    function handleSubmit(e)
    {
      

      fetch('http://localhost:3001/api/foods/items',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'name': foodName,
          'grams': grams,
          'calories': calories,
          'carbs': carbs,
          'fat': fats,
          'protein': proteins,
          'fiber': fiber,
          'sodium': sodium,
          'cholesterol': cholesterol,
          'sugar': sugar,
          'cost': cost,
          'listId':items.id
        })
      }).then(route("/foodlist"));
    }

    return (
      <div>
        <Sidebar />
      <div id="form-container">
        <form className="form">
          <h3 className="form__title">Create Food Items</h3>
          <div className="form__item">
            <label className="form__label">
              Food Name</label>
            <input 
            type="text" 
            name="Food Name"
            placeholder="Egg Omelette..."
            onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="form__item">
            <label className="form__label">
              Enter Grams</label>
            <input 
            label= "Hello!!!"
            type="text" 
            name="Enter Grams"
            placeholder="100gm"
            onChange={(e) => setGrams(e.target.value)}
            />
            </div>

          <div className="form__item">
            <label className="form__label">
              Enter Calories</label>
            <input 
            type="text" 
            name="calories"
            placeholder="Calories..."
            onChange={(e) => setCalories(e.target.value)}
            />
            </div>
          
          <div id="carbs-and-fats-container">
          <div className="form__item carbs-and-fats">
            <label className="form__label">
              Carbohydrates</label>
            <input 
            type="text" 
            name="carbs"
            placeholder="Carbs..."
            onChange={(e) => setCarbs(e.target.value)}
            />
            </div>

          <div className="form__item carbs-and-fats" id="fats">
            <label className="form__label">
              Fats</label>
            <input 
            type="text" 
            name="fats"
            placeholder="Fat..."
            onChange={(e) => setFats(e.target.value)}
            />
            </div>
            </div>

          <div className="form__item">
            <label className="form__label">
              Proteins</label>
            <input 
            type="text" 
            name="proteins"
            placeholder="Protein..."
            onChange={(e) => setProteins(e.target.value)}
            />
            </div>

          <div className="form__item">
            <label for="fiber" className="form__label">
              Fiber</label>
            <input 
            type="text" 
            name="fiber"
            placeholder="Fiber..."
            onChange={(e) => setFiber(e.target.value)}
            />
            </div>

          <div className="form__item">
            <label for="cholesterol" className="form__label">
              Cholesterol</label>
            <input 
            type="text" 
            name="cholesterol"
            placeholder="Cholesterol..."
            onChange={(e) => setCholesterol(e.target.value)}
            />
            </div>

          <div className="form__item">
            <label for="sodium" className="form__label">
              Sodium</label>
            <input 
            type="text" 
            name="sodium"
            placeholder="Sodium..."
            onChange={(e) => setSodium(e.target.value)}
            />
            </div>
            
          <div className="form__item">
            <label for="sugar" className="form__label">
              Sugar</label>
            <input 
            type="text" 
            name="sugar"
            placeholder="Sugar..."
            onChange={(e) => setSugar(e.target.value)}
            />
            </div>

            <div className="form__item">
              <label for="cost" className="form__label">
                Cost</label>
              <input 
              type="text" 
              name="cost"
              placeholder="Cost..."
              onChange={(e) => setCost(e.target.value)}
              />
            </div>

            <button class="button" onClick={() => handleSubmit()}>Save</button>
        </form>
        </div>
        </div>
      )
}

export default CreateFoodItems;

