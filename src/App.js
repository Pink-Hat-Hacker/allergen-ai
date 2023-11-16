// App.js
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import { detectFood } from "./services/logMealService";
import { getAllergenData } from "./services/firebaseService";
import {
  Box,
  Grid,
  Flex,
  Heading,
  Button,
  Text,
  Strong,
  Badge,
} from "@radix-ui/themes";

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

      // Fetch allergen data from Firebase
      const allergenData = await getAllergenData(nutriInfo);

      setDetectedFood(foodName);
      setPossibleAllergens(allergenData);
      setProb((probability * 100).toFixed(2));
      setNutriInfo(nutriInfo);
    } catch (error) {
      console.error("Error detecting food:", error);
    }
  };

  return (
    <>
      <Heading
        className="aa-title"
        color="iris"
        align="left"
        size={{initial:'9'}}
        style={{ paddingLeft: "20px", paddingTop: "20px" }}
      >
        allergen.ai
      </Heading>

      <Grid
        columns="2"
        width="auto"
        gap="9"
        pl="5"
        pr="5"
        style={{ paddingTop: "100px" }}
      >
        <Flex
          p="5"
          gap="3"
          direction="column"
          align="center"
          justify="center"
          style={{ background: "var(--iris-a3)", borderRadius: "1em"}}
        >
          <Box width="100%" height="100%" className="aa-file-upload box" style={{alignItems: "center", textAlign: "center", justifyContent:"center"}}>
            <FileUpload onFileUpload={handleFileUpload} />
          </Box>
          <Button className="aa-file-upload bt" size="4" variant="solid">
            execute
          </Button>
        </Flex>

        <Flex
          p="5"
          gap="6"
          direction="column"
          align="start"
          justify="center"
          style={{ background: "var(--iris-a3)", borderRadius: "1em"}}
        >
          <Box className="aa-response food-detection">
            <Text size="7" weight="light">
              detected food: <Strong>{detectedFood}</Strong> with <Badge size="2" color="green">{prob}%</Badge> probability
            </Text>
          </Box>

          <Box width="100%" className="aa-response ingredient-list">
            <Text size="7" weight="light">probable <Strong>ingredients:</Strong></Text>
            <br></br><br></br>
            {nutri.map((ingre, index) => (
              <Badge
                mr="3"
                mb="2"
                size="2"
                key={ingre}
                color={
                  index % 4 === 0
                    ? "green"
                    : index % 4 === 1
                    ? "pink"
                    : index % 4 === 2
                    ? "blue"
                    : "yellow"
                }
              >
                {ingre}
              </Badge>
            ))}
          </Box>

          <Box className="aa-response allergen-list">
            <Text size="7">probable <Strong>allergens:</Strong></Text>
            <Grid rows={possibleAllergens.length} width="auto">
              <ul style={{listStyleType: "none"}}>
                {Object.entries(possibleAllergens).map(([key, values]) => (
                  <li key={key}>
                    <Badge color="red">{key}:</Badge> {values.join(", ")}
                  </li>
                ))}
              </ul>
            </Grid>
          </Box>
        </Flex>
      </Grid>
    </>
  );
};

export default App;
