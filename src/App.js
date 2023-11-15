// App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import { detectFood } from './services/logMealService';
import { getAllergenData } from './services/firebaseService';

const App = () => {
  const [detectedFood, setDetectedFood] = useState('');
  const [possibleAllergens, setPossibleAllergens] = useState([]);

  const handleFileUpload = async (file) => {
    try {
      // Upload the file to LogMeal API
      const { foodName } = await detectFood(file);

      // Fetch allergen data from Firebase
      const allergenData = await getAllergenData();

      // Cross-reference allergens
      const allergens = allergenData[foodName] || [];

      setDetectedFood(foodName);
      setPossibleAllergens(allergens);
    } catch (error) {
      console.error('Error detecting food:', error);
    }
  };

  return (
    <div>
      <h1>allergen.ai</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <div>
        <h2>Detected Food: {detectedFood}</h2>
        <h3>Possible Allergens:</h3>
        <ul>
          {possibleAllergens.map((allergen) => (
            <li key={allergen}>{allergen}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;