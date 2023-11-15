// firebaseService.js
import {initializeApp} from 'firebase/app';
import { getDatabase } from "firebase/database";
import {firebaseConfig} from '../config';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const getAllergenData = async () => {
  try {
    const snapshot = await database.collection('allergens').get();
    const allergenData = {};

    snapshot.forEach((doc) => {
      allergenData[doc.data().foodName] = doc.data().allergens;
    });

    return allergenData;
  } catch (error) {
    throw new Error('Error fetching allergen data:', error);
  }
};
