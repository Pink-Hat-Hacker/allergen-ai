// logMealService.js
import axios from "axios";
import { configuration } from "../config";
import {filetoDataURL, urltoBlob, compressAccurately} from "image-conversion";


const convertAndCompressImage = async (file, targetSizeInMB) => {
  console.log(file);
  const isJpeg = file.type === 'image/jpeg';

  // Check if the file is already a JPEG and within the size limit
  if (isJpeg && file.size / (1024 * 1024) <= targetSizeInMB) {
    console.log("It's a JPEG and it's within the size limit.");
    return file;
  }

  // If it's a JPEG but too big, compress it
  if (isJpeg) {
    console.log("It's a JPEG but too big. Compressing...");
    const compressedBlob = await compressAccurately(file,targetSizeInMB*900);
    console.log(compressedBlob);
    // const compressedDataUrl = imageConversion.compress(file, { quality: 0.8 });
    // const compressedBlob = imageConversion.dataUrlToBlob(compressedDataUrl);
    return new File([compressedBlob], file.name, { type: 'image/jpeg' });
  }

  // Convert to JPEG and compress
  console.log("It's not a JPEG. Converting and compressing...");

  const dataUrl = filetoDataURL(file);
  console.log(dataUrl);
  const blob = await urltoBlob(dataUrl);
  console.log(blob);
  const compressedBlob = await compressAccurately(blob, targetSizeInMB*900);
  console.log(compressedBlob);
  return new File([compressedBlob], file.name, { type: 'image/jpeg' });
};

export const detectFood = async (file) => {
  try {
    const compressedFile = await convertAndCompressImage(file, 1); // Set your target size in MB

    const formData = new FormData();
    formData.append("image", compressedFile);

    const dishResponse = await axios.post(
      configuration.LOGMEAL_API_URL + configuration.LOGMEAL_API_DISHPATH,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + configuration.LOGMEAL_API_KEY,
        },
      }
    );

    const { imageId } = dishResponse.data;
    const recipeNutriParams = {
      imageId: imageId,
    };

    const nutriResponse = await axios.post(
      configuration.LOGMEAL_API_URL + configuration.LOGMEAL_API_NUTRIPATH,
      recipeNutriParams,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + configuration.LOGMEAL_API_KEY,
        },
      }
    );
    const { recipe } = nutriResponse.data;
    const ingredients = recipe.map((item) => item.name);

    return {
      foodName:
        dishResponse.data.foodFamily[0]["name"] +
        " " +
        nutriResponse.data.foodName,
      probability: dishResponse.data.foodFamily[0]["prob"],
      nutriInfo: ingredients,
    };
  } catch (error) {
    console.log("logMealService.js: " + error);
    throw new Error("logMealService.js: :" + error);
  }
};
