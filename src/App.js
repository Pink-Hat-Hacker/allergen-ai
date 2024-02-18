// App.js
import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import FileUpload from "./components/FileUpload";
import { detectFood } from "./services/logMealService";
import { getAllergenData } from "./services/firebaseService";
import {
  Box,
  Grid,
  Flex,
  Heading,
  Text,
  Link,
  Strong,
  Badge,
  Tooltip,
  IconButton,
  Callout,
} from "@radix-ui/themes";

import "./App.css";
import {
  ExclamationTriangleIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  VercelLogoIcon
} from "@radix-ui/react-icons";


const App = () => {
  // Color changer to ensure state is always changing
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = ["iris", "iris"];
  useEffect(() => {
    // Set up an interval to cycle through colors
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 100); // Adjust the interval as needed (in milliseconds)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [colors.length, currentColorIndex]);
  const currentColor = colors[currentColorIndex];

  // API and Detection States
  const [detectedFood, setDetectedFood] = useState("");
  const [possibleAllergens, setPossibleAllergens] = useState({});
  const [prob, setProb] = useState();
  const [nutri, setNutriInfo] = useState([]);
  const { width } = useWindowSize();

  // Collapsible icon and link list
  const [open, setOpen] = React.useState(false);

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
          setPossibleAllergens(allergenData);
        })
        .catch((error) => {
          console.log("Error fetching allergen data:", error);
          alert(`Error fetching allergen data: ${error}`);
        });
    } catch (error) {
      console.log("Error detecting food:", error);
      alert(`Error detecting food: ${error}`);
    }
  };

  return (
    <>
      <Flex justify="between" align="center">
        <Heading
          className="aa-title"
          color={currentColor}
          size={{ initial: "9" }}
          style={{ paddingLeft: "20px", paddingTop: "20px" }}
        >
          allergen.ai
        </Heading>

        <Flex gap="3" pr="5" pt="6" wrap={"wrap"}>
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

      {/* Temporary error container. LogMeal free trial is up. */}
      <Flex pt={"5"} pb={"0"} align={"center"} justify={"center"}>
        <Callout.Root color="red" size={"3"} variant="surface">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text size={"5"}>
            <u>allergen.ai</u> is <b>DOWN</b> for rebuild. My LogMeal API free
            trial is ... depleted. If you would like to learn more about the
            project visit its
            <Link href="https://github.com/pink-hat-hacker/allergen-ai">
              {" "}
              GitHub repo{" "}
            </Link>{" "}
            or watch this{" "}
            <Link href="https://youtu.be/KKe5K4mbMAo"> Video</Link>.
          </Callout.Text>
        </Callout.Root>
      </Flex>

      <Grid
        columns={width >= 800 ? "2" : undefined}
        rows={width < 800 ? "2" : undefined}
        width="auto"
        gap="9"
        pl="5"
        pr="5"
        style={{ paddingTop: "5%" }}
        // changed padding to 5% from 10% for error container
      >
        {/* File Upload Container */}
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

        {/* Food, Ingredient, Allergen container */}
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

      {/* Footer */}
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
