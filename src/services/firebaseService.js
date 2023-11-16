// firebaseService.js
import {initializeApp} from 'firebase/app';
import { getDatabase, get, child, ref} from "firebase/database";
import {firebaseConfig} from '../config';
import { all } from 'axios';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export const getAllergenData = async (nutriInfo) => {
  try {
    const allergenData = {};
    const allergenCategoriesSnapshot = get(child(dbRef, `/allergen`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    console.log(allergenCategoriesSnapshot);

    // allergenCategoriesSnapshot.forEach((allergenCategory) => {
    //   console.log(allergenCategory);
    //   const category = allergenCategory.key;
    //   const allergens = allergenCategory.val();

    //   // Check each allergen in the category
    //   Object.entries(allergens).forEach(([allergen, allergenValue]) => {
    //     // Check if allergenValue is present in nutriInfo
    //     if (nutriInfo.includes(allergenValue)) {
    //       // Add the allergen category and allergen to allergenData
    //       if (!allergenData[category]) {
    //         allergenData[category] = [];
    //       }
    //       allergenData[category].push(allergen);
    //     }
    //   });
    // });

    return allergenData;
  } catch (error) {
    throw new Error('Error fetching allergen data:', error);
  }
};
