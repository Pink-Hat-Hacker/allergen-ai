// App.js
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import { detectFood } from "./services/logMealService";
import { getAllergenData } from "./services/firebaseService";
import { Box, Grid, Flex, Heading, Button, Text, Strong, Badge, Card} from "@radix-ui/themes";

import "./App.css";

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
    <>
      <Heading className="aa-title" color="iris" align="left" size="9">
        allergen.ai
      </Heading>

      <Grid columns="2" width="auto" gap="9">
        <Flex
          p="5"
          gap="3"
          direction="column"
          align="center"
          justify="center"
          style={{ background: "var(--red-a2)" }}
        >
          <Box width="100%" height="100%" className="aa-file-upload box">
            <FileUpload onFileUpload={handleFileUpload} />
          </Box>
          <Button className="aa-file-upload bt" size="3" variant="soft">
            execute
          </Button>
        </Flex>

        <Flex p="5" gap="9" direction='column' align='start' justify='center' style={{ background: "var(--blue-a2)"}}>
          <Box className="aa-response food-detection">
            <Text size='7'>detected food: <Strong>{detectedFood}</Strong> with <Strong>{prob}%</Strong> probability</Text>
          </Box>

          <Box width="100%" className="aa-response ingredient-list" style={{border: '2px dashed #fff'}}>
            <Text size='5'>possible ingredients:</Text>
            {nutri.map((ingre) => (
                <Badge size="2" key={ingre}>{ingre}</Badge>
            ))}
          </Box>

          <Box className="aa-response allergen-list">
            <Text size='5'>possible allergens:</Text>
            <ul>
              {Object.entries(possibleAllergens).map(([key, values]) => (
                <li key={key}>
                  <Badge color="orange">{key}:</Badge> {values.join(", ")}
                </li>
              ))}
            </ul>
          </Box>
        </Flex>
        {/* <Flex direction='column' align='start' justify='center'>
          <Box height="100%" width="100%" className="aa-file-upload">
            <FileUpload onFileUpload={handleFileUpload} />
          </Box>
        </Flex>
        <br></br>
        <Button size="4" > execute </Button>
        <Flex direction="column" style={{background: 'var(--blue-a2)'}}>
          <Box height="auto">
            <Container className="aa-response container">
              <Box height="25%">
                <div className="aa-response food-detection">
                  <h2>
                    detected food: {detectedFood} with {prob}% probability
                  </h2>
                </div>
              </Box>
              <Box height="25%">
                <div className="aa-response ingredient-list">
                  <h3>possible ingredients:</h3>
                  <ul>
                    {nutri.map((ingre) => (
                      <li key={ingre}>{ingre}</li>
                    ))}
                  </ul>
                </div>
              </Box>
              <Box height="25%">
                <div className="aa-response allergen-list">
                  <h3>possible allergens:</h3>
                  <ul>
                    {Object.entries(possibleAllergens).map(([key, values]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {values.join(", ")}
                      </li>
                    ))}
                  </ul>
                </div>
              </Box>
            </Container>
          </Box>
        </Flex> */}
      </Grid>
    </>
  );
};

export default App;
