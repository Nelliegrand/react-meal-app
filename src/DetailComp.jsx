import React, { useState, useEffect } from "react";
import "./Styling/CompStyles.css";

//Skapar detaljkomponenten
function DetailComp({ mealId }) { //mealId för att hålla koll på id bland maträtterna
    const [mealDetails, setMealDetails] = useState(null);

    // Ifall maträtten ändras
    useEffect(() => {
        if (mealId) {
            getDetails(mealId);
        }
    }, [mealId]);

    const getDetails = (id) => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((response) => response.json())
            .then((result) => {
                setMealDetails(result.meals[0]); //lägger till detaljerna på den klickade maträtten
            })
            .catch((error) => {
                console.error("Felmeddelande", error); //fånga upp felmeddelande
            });
    };

    return (
        <div>
            {/* Visa detaljer om maträtterna om de finns */}
            {mealDetails && (
                <div>
                <p>{mealDetails.idMeal}</p>
                <p>{mealDetails.strMeal}</p>
                <p>{mealDetails.strDrinkAlternate}</p>
                <p>{mealDetails.strCategory}</p>
                <p>{mealDetails.strArea}</p>
                <p>{mealDetails.strInstructions}</p>
                </div>
            )}
        </div>
    );
}

export default DetailComp;

