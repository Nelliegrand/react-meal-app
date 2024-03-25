import React, { useState } from "react";
import DetailComp from "./DetailComp";
import "./Styling/CompStyles.css";

function SearchComp() {
  const [searchMeal, setSearchMeal] = useState('');
  const [mealResult, setMealResult] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);

  const handleInput = (e) => {
    setSearchMeal(e.target.value);
  };

  const handleBtn = (e) => {
    e.preventDefault();
    getMeal();
  };

  const getMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
      .then((response) => response.json())
      .then((result) => {
        setMealResult(result.meals || []);
      })
      .catch((error) => {
        console.error("Felmeddelande", error);
      });
  };

  const handleMealClick = (id) => {
    setSelectedMealId(id);
  };

  return (
    <div>
      <form className='searchForm' onSubmit={handleBtn}>
        <input type="text" value={searchMeal} onChange={handleInput} />
        <button type="submit">Sök</button>
      </form>

      <div>
        <ul>
          {mealResult.map((meal) => (
            <li key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal}/>
              <h2 className='clickMealName' onClick={() => handleMealClick(meal.idMeal)}>{meal.strMeal}</h2>
              {meal.idMeal === selectedMealId && <DetailComp mealId={selectedMealId} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchComp;