// firebaseService.js
import { initializeApp } from "firebase/app";
import { getDatabase, get, child, ref } from "firebase/database";
import { firebaseConfig } from "../config";
import { all } from "axios";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export const getAllergenData = async (nutriInfo) => {
  console.log(nutriInfo);
  try {
    const allergenData = {};
    get(child(dbRef, `/allergen`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allergenCategoriesSnapshot = snapshot.val();
          console.log(allergenCategoriesSnapshot);

          // Flatten the allergen categories and allergens into a single array
          const flatAllergens = Object.entries(allergenCategoriesSnapshot)
          .flatMap(([category, allergens]) => Object.entries(allergens)
            .map(([allergen, allergenValue]) => {
              // Convert allergenValue to lowercase if it's a string or an object
              const lowercasedValue = typeof allergenValue === 'string'
                ? allergenValue.toLowerCase()
                : Array.isArray(allergenValue)
                  ? allergenValue.map(value => (value).toLowerCase())
                  : allergenValue;
    
              return {
                category: category.toLowerCase(),
                allergen: allergen.toLowerCase(),
                allergenValue: lowercasedValue,
              };
            })
          );

          console.log(flatAllergens);
          // Filter the flatAllergens based on nutriInfo
          const matchedAllergens = flatAllergens.filter(({ allergenValue }) =>
            nutriInfo.includes(allergenValue)
          );

          console.log(matchedAllergens);

          // Group the matched allergens by category
          const allergenData = matchedAllergens.reduce(
            (result, { category, allergen }) => {
              if (!result[category]) {
                result[category] = [];
              }
              result[category].push(allergen);
              return result;
            },
            {}
          );
          console.log(allergenData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return allergenData;
  } catch (error) {
    throw new Error("Error fetching allergen data:", error);
  }
};
