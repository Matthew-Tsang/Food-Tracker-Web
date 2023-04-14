import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Settings from "./Settings";
import FoodList from "./FoodList";
import MealPlanList from './MealPlanList';
import AddFoodToMeal from "./AddFoodToMeal";
import { Sidebar } from './Sidebar';
import MealPlan from "./MealPlan";
import CreateFoodItems from './CreateFoodItem';
import FoodSelector from "./FoodSelector";
import FoodItem from "./FoodItem";

export default function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/todo/:id" element={<TodoList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/foodlist" element={<FoodList />} />
          <Route path="/addfoodtomeal" element={<AddFoodToMeal />} />
          <Route path="/createfood" element={<CreateFoodItems />} />
          <Route path="/mealplan" element={<MealPlanList />} />
          <Route path="/mealplan/:listId" element={<MealPlan />} />
          <Route path="/mealplan/:listId/add" element={<FoodSelector />} />
          <Route path="/home" element={<Profile />} />
          <Route path="/food/:listId/:foodId" element={<FoodItem isPlan="false"/>} />
          <Route path="/mealplan/:listId/:foodId" element={<FoodItem isPlan="true"/>} />
          {/* <Route component={NotFoundPage} />  */}
        </Routes>
      </Router>
    </div>
  )
}

