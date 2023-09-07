import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styled from "styled-components";

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
      axios
        .get(`https://api.spoonacular.com/recipes/random?number=10&apiKey=db9ac7356c114fbe8808cb0eac6a5acd`)
        .then((response) => {
          setRecipes(response.data.recipes);
        })
    }, []);
    
    return (
      <Container>
        <Wrapper>
          <h3>Popular Recipes</h3>
          <Splide options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: '1rem', 
          }}>
            {recipes.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Link to={`/recipe/${recipe.id}`}>
                <Card>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
                <p>{recipe.title}</p>
                </Link>
              </SplideSlide>
            ))}
          </Splide>
        </Wrapper>
      </Container>
    );
  }

  const Container = styled.div`
  padding: 1rem;
`;

const Wrapper = styled.div`
  margin: 2rem 0rem;
  text-align: center;

  @media (max-width: 768px) {
    /* Adjust layout for smaller screens */
    margin: 1rem 0rem;
  }
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    /* Adjust card size for smaller screens */
    min-height: 15rem;
  }
`;

export default MyRecipes
