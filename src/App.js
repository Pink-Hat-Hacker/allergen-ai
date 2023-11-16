// App.js
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import { detectFood } from "./services/logMealService";
import { getAllergenData } from "./services/firebaseService";

const App = () => {
  const [detectedFood, setDetectedFood] = useState("");
  const [possibleAllergens, setPossibleAllergens] = useState([]);
  const [prob, setProb] = useState();
  const [nutri, setNutriInfo] = useState([]);

  const handleFileUpload = async (file) => {
    try {
      // Upload the file to LogMeal API
      const { foodName, probability, nutriInfo } = await detectFood(file);
      // console.log(probability);
      // console.log(nutriInfo);

      // Fetch allergen data from Firebase
      // const nutriInfo = ['pasta', 'pork', 'onion', 'green pepper', 'olive oil', 'tomato', 'garlic', 'basil', 'oregano', 'salt', 'black pepper', 'red pepper'];
      const allergenData = await getAllergenData(nutriInfo);
      // Cross-reference allergens
      // const allergens = allergenData["pasta"] || [];

      setDetectedFood(foodName);
      setPossibleAllergens(allergenData);
      setProb(probability * 100);
      setNutriInfo(nutriInfo);
    } catch (error) {
      console.error("Error detecting food:", error);
    }
  };

  return (
    <div>
      <h1>allergen.ai</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <div>
        <h2>
          detected food: {detectedFood} with {prob}% probability
        </h2>
        <h3>possible ingredients:</h3>
        <ul>
          {nutri.map((ingre) => (
            <li key={ingre}>{ingre}</li>
          ))}
        </ul>

        <h3>possible allergens:</h3>
        <ul>
          {Object.entries(possibleAllergens).map(([key, values]) => (
            <li key={key}>
              <strong>{key}:</strong> {values.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
