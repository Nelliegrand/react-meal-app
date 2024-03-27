import React, { useState, useRef } from "react";
import DetailComp from "./DetailComp";
import "./Styling/CompStyles.css";

//Skapar min Sökkomponent
function SearchComp() {
  const inputSearch = useRef(null); //hänvisa till inputfältet
  const [mealResult, setMealResult] = useState([]); //state för sökresultatet
  const [clickedMealId, setClickedMealId] = useState(null); //state för när man klickat på en måltid

  // Fånga upp värdet i sökrutan
  const handleInput = (e) => {
    const value = inputSearch.current.value;
  };

  //eventhandler för sökknappen
  const handleBtn = (e) => {
    e.preventDefault();
    getMeal();
  };

  //Funktion för att hämta datat från APIet
  const getMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.current.value}`)//matcha det som söks på med API
      .then((response) => response.json())
      .then((result) => {
        setMealResult(result.meals);//lägg in API-resultatet i setMealResult
      })
      .catch((error) => {
        console.error("Felmeddelande", error); //Fånga upp felmeddelande
      });
  };

  //funktion för specifikt maträtts-klick
  const handleMealClick = (id) => {
    setClickedMealId(id);
  };

  return (
    <div>
        {/*Sökformulär*/}
      <form className='searchForm' onSubmit={handleBtn}>
        <input ref={inputSearch} type="text" onChange={handleInput} />
        <button type="submit">Söt</button>
      </form>

      <div>
        <ul>
          {mealResult.map((meal) => ( //loopa genom listan av maträtter
            <li key={meal.idMeal}> 
              <img src={meal.strMealThumb} alt={meal.strMeal}/>
              <h2 className='clickMealName' onClick={() => handleMealClick(meal.idMeal)}>{meal.strMeal}</h2> 
              {/*infoga DetailComp för att hämta detaljer på den maträtt som klickas på*/}
              {meal.idMeal === clickedMealId && <DetailComp mealId={clickedMealId} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchComp;