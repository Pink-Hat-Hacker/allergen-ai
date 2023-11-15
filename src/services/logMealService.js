// logMealService.js
import axios from "axios";
import { configuration } from "../config";
import imageConversion from "image-conversion";

const convertAndCompressImage = (file, targetSizeInMB) => {
  // Check if the file is already a JPEG and within the size limit
  if (
    file.type === "image/jpeg" &&
    file.size / (1024 * 1024) <= targetSizeInMB
  ) {
    return file;
  }

  // Convert to JPEG and compress
  const dataUrl = imageConversion.toJpeg(file);
  const blob = imageConversion.dataUrlToBlob(dataUrl);

  // Compress the image while maintaining quality
  const compressedBlob = imageConversion.compress(blob, { quality: 0.8 }); // Adjust quality as needed

  return new File([compressedBlob], file.name, { type: "image/jpeg" });
};

export const detectFood = async (file) => {
  try {
    const compressedFile = convertAndCompressImage(file, 1); // Set your target size in MB
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

    console.log(dishResponse.data.segmentation_results[0]['recognition_results'][0]['id']);
    console.log(dishResponse.data.segmentation_results[0]['recognition_results'][0]['name']);
    console.log(dishResponse.data.imageId);
    const dishDescription = {
      'dish_id': dishResponse.data.segmentation_results[0]['recognition_results'][0]['id'],
      'foodName': dishResponse.data.segmentation_results[0]['recognition_results'][0]['name'],
      'hasRecipe': false,
      'imageId': dishResponse.data.imageId,
      'is_combo': false,
      'recipe': [],
      'recipe_per_item': [],
      'serving_size': 1,
      'source': ""
    }
    const nutriResponse = await axios.post(
      configuration.LOGMEAL_API_URL + configuration.LOGMEAL_API_NUTRIPATH,
      dishDescription,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + configuration.LOGMEAL_API_KEY,
        },
      }
    );

    return {
      'foodName': dishResponse.data.foodFamily[0]["name"],
      'probability': dishResponse.data.foodFamily[0]["prob"],
     'nutriInfo': nutriResponse.data,
    };
  } catch (error) {
    throw new Error("Error detecting food:", error);
  }
};
