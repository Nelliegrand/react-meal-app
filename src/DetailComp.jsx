import React, { useState, useEffect } from "react";
import "./Styling/CompStyles.css";
          
function DetailComp({ mealId }) {
    const [mealDetails, setMealDetails] = useState(null);
  
    useEffect(() => {
      if (mealId) {
        getDetails(mealId);
      }
    }, [mealId]);
  
    const getDetails = (id) => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.meals && result.meals.length > 0) {
            setMealDetails(result.meals[0]);
          } else {
            setMealDetails(null);
            console.error("Det finns inga detaljer om denna maträtt");
          }
        })
        .catch((error) => {
          console.error("Felmeddelande", error);
        });
    };
  
    return (
      <div>
        {mealDetails && (
          <p>{mealDetails.strInstructions}</p>
        )}
      </div>
    );
  }
  
  export default DetailComp;