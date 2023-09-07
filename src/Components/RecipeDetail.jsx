import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {


    setRecipe(null);
    setError(null);

    setLoading(true);

    axios
      .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=db9ac7356c114fbe8808cb0eac6a5acd&includeNutrition=true`)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
        setError("Error fetching recipe details. Please try again.");
        setLoading(false);
      });
  }, [id]);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const showIngredients = () => {
    setActiveTab("ingredients");

  };

  const showNutrition = () => {
    setActiveTab("nutrition");
    console.log(activeTab)
  };

  return (
    <RecipeContainer>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {recipe && (
        <>
          <RecipeImage src={recipe.image} alt={recipe.title} />
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeDetails>
            <p>Preparation Time: {recipe.preparationTime} minutes</p>
            <p>Servings: {recipe.servings}</p>
          </RecipeDetails>
          <RecipeInstructions>
            <TabsContainer>
              <TabButton
                onClick={() => handleTabClick("instructions")}
                active={activeTab === "instructions"}
              >
                Instructions
              </TabButton>
              <TabButton
                onClick={showIngredients}
                active={activeTab === "ingredients"}
              >
                Ingredients
              </TabButton>
              <TabButton
                onClick={showNutrition}
                active={activeTab === "nutrition"}
              >
                Nutrition
              </TabButton>
            </TabsContainer>
            <TabContent active={activeTab === "instructions"}>
              <h3>Instructions:</h3>
              <InstructionText>{recipe.instructions}</InstructionText>
            </TabContent>
            <TabContent active={activeTab === "ingredients"}>
              <h3>Ingredients:</h3>
              <InstructionText>
                {recipe.extendedIngredients.map((ingredient) => (
                  <IngredientItem key={ingredient.id}>
                    {ingredient.original}
                  </IngredientItem>
                ))}
              </InstructionText>
            </TabContent>
            <TabContent active={activeTab === "nutrition"}>
              <h3>Nutrition:</h3>
              <table style={{ border: "1px solid #ddd", textAlign: "center", margin: "0 auto" }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: "1px solid #ddd" }}>Nutrient</th>
                    <th style={{ borderBottom: "1px solid #ddd" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe &&
                    recipe.nutrition.nutrients.map((nutrient) => (
                      <tr key={nutrient.title}>
                        <td>{nutrient.name}</td>
                        <td>{nutrient.amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </TabContent>

          </RecipeInstructions>

        </>
      )}
    </RecipeContainer>
  );
}

// Styled components
const RecipeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const RecipeImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const RecipeTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const RecipeDetails = styled.div`
  margin-top: 10px;
`;

const RecipeInstructions = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1rem;
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 20px;
`;
const TabsContainer = styled.div`
  margin-top: 20px;
`;
const InstructionText = styled.p`
  font-size: 1rem;
`;
const IngredientItem = styled.p`
  font-size: 1rem;
`;
const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.active ? "#007bff" : "#ccc")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
`;

const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  margin-top: 20px;
`;


export default RecipeDetail;
