// App.js
import React, { useState } from "react";
import { useWindowSize } from "react-use";
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
  Link,
  Strong,
  Badge,
  Tooltip,
  IconButton,
} from "@radix-ui/themes";

import "./App.css";
import {
  ExclamationTriangleIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  VercelLogoIcon,
} from "@radix-ui/react-icons";

const App = () => {
  const [detectedFood, setDetectedFood] = useState("");
  const [possibleAllergens, setPossibleAllergens] = useState([]);
  const [prob, setProb] = useState();
  const [nutri, setNutriInfo] = useState([]);
  const { width } = useWindowSize();


  const handleFileUpload = async (file) => {
    try {
      // Upload the file to LogMeal API
      const { foodName, probability, nutriInfo } = await detectFood(file);
      setProb((probability * 100).toFixed(2));
      setDetectedFood(foodName);
      setNutriInfo(nutriInfo);

      // Fetch allergen data from Firebase
      getAllergenData(nutriInfo)
      .then((allergenData) => {
        console.log(allergenData)
        setPossibleAllergens(allergenData);
      })
      .catch((error) => {
        console.error('Error fetching allergen data:', error);
      });
      console.log(possibleAllergens);
    } catch (error) {
      console.error("Error detecting food:", error);
    }
  };

  return (
    <>
      <Flex justify="between" align="center">
        <Heading
          className="aa-title"
          color="iris"
          size={{ initial: "9" }}
          style={{ paddingLeft: "20px", paddingTop: "20px" }}
        >
          allergen.ai
        </Heading>
        <Flex gap="3" pr="5" pt="6">
          <IconButton>
            <GitHubLogoIcon
              onClick={() =>
                window.open(
                  "https://github.com/pink-hat-hacker/allergen-ai",
                  "_blank"
                )
              }
            ></GitHubLogoIcon>
          </IconButton>
          <IconButton>
            <LinkedInLogoIcon
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/zoe-yoyo-valladares/",
                  "_blank"
                )
              }
            ></LinkedInLogoIcon>
          </IconButton>
          <IconButton>
            <VercelLogoIcon
              onClick={() =>
                window.open("https://vercel.com/pink-hat-hacker", "_blank")
              }
            ></VercelLogoIcon>
          </IconButton>
        </Flex>
      </Flex>

      <Grid
        columns={width >= 750 ? "2" : undefined}
        rows={width < 750 ? "2" : undefined}
        width="auto"
        gap="9"
        pl="5"
        pr="5"
        style={{ paddingTop: "10%" }}
      >
        <Flex
          p="5"
          gap="3"
          direction="column"
          align="center"
          justify="center"
          style={{ background: "var(--iris-a3)", borderRadius: "1em" }}
        >
          <FileUpload onFileUpload={handleFileUpload} />
        </Flex>

        <Flex
          p="5"
          gap="6"
          direction="column"
          align="start"
          justify="center"
          style={{ background: "var(--iris-a3)", borderRadius: "1em" }}
        >
          <Box className="aa-response food-detection">
            <Text size="7" weight="light">
              detected food:
            </Text>
            <Text size="7">
              <Strong> {detectedFood} </Strong>
            </Text>
            <Text
              size="7"
              color="green"
              style={{ background: "var(--green-a3)", borderRadius: ".2em" }}
            >
              <Strong>{prob}%</Strong>
            </Text>
          </Box>

          <Box width="100%" className="aa-response ingredient-list">
            <Text size="7" weight="light">
              probable ingredients:
            </Text>
            <br></br>
            {nutri.map((ingre, index) => (
              <Badge
                mr="3"
                mt="2"
                size="2"
                key={ingre}
                color={
                  index % 4 === 0
                    ? "iris"
                    : index % 4 === 1
                    ? "plum"
                    : index % 4 === 2
                    ? "lime"
                    : "yellow"
                }
              >
                {ingre}
              </Badge>
            ))}
          </Box>

          <Box className="aa-response allergen-list">
            <Tooltip content="Consult with food provider or official nutritional information. This is for educational and experimental purposes only.">
              <ExclamationTriangleIcon></ExclamationTriangleIcon>
            </Tooltip>
            <Text size="7" weight="light">
              {" "}
              probable allergens:
            </Text>
            <br></br>
            {Object.entries(possibleAllergens).map(([key, values]) => (
              <Badge
                id={key}
                key={key}
                mt="2"
                mr="3"
                size="2"
                color="red"
                variant="surface"
              >
                <strong>{key}:</strong> {values.join(", ")}
              </Badge>
            ))}
          </Box>
        </Flex>
      </Grid>

      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "1rem",
          background: "var(--iris-a2)",
        }}
      >
        <Link href="https://logmeal.es" target="_blank" size="5">
          Powered by: LogMeal.es
        </Link>
      </Flex>
    </>
  );
};

export default App;
