// firebaseService.js
import { initializeApp } from "firebase/app";
import { getDatabase, get, child, ref } from "firebase/database";
import { firebaseConfig } from "../config";

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

          // Iterate through each category
          Object.entries(allergenCategoriesSnapshot).forEach(
            ([category, allergens]) => {
              // Iterate through each allergen in the category
              Object.entries(allergens).forEach(([allergen, allergenValue]) => {
                // Check if any value from nutriInfo is included in the allergen values
                const foundValue = nutriInfo.find((info) => {
                  if (typeof allergenValue === "object") {
                    // Check if the allergenValue is an object (subcategories)
                    return Object.values(allergenValue).includes(info);
                  } else {
                    // Check if the allergenValue is a string
                    return allergenValue === info;
                  }
                });

                // If found, add the allergen category and allergen value to allergenData
                if (foundValue) {
                  if (!allergenData[category]) {
                    allergenData[category] = [];
                  }
                  allergenData[category].push({ [allergen]: foundValue });
                }
              });
            }
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
