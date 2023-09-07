import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function RecipeSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    

    setSearchResults([]);
    setError(null);

    setLoading(true);
    axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?number=10&tags=vegetarian&apiKey=db9ac7356c114fbe8808cb0eac6a5acd`, {
        params: {
          
          query: searchQuery,
        },
      })
      .then((response) => {
        setSearchResults(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error searching for recipes. Please try again.");
        setLoading(false);
      });
  };

  return (
    <SearchContainer>
      <h2>Search for Recipes</h2>
      <SearchForm>
        <SearchInput
          type="text"
          placeholder="Enter Recipe Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchForm>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {searchResults.length > 0 && (
        <SearchResults>
          <h3>Search Results:</h3>
          <ul>
            <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: '1rem',
        }}>
            {searchResults.map((recipe) => (
                <SplideSlide>
                  <Link to={`/recipe/${recipe.id}`}>
              <li key={recipe.id}>
                <h4>{recipe.title}</h4>
                <img src={recipe.image} alt={recipe.title} />
              </li>
              </Link>
              </SplideSlide>
            ))}
            </Splide>
          </ul>
        </SearchResults>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SearchResults = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
  }

  h4 {
    font-size: 1rem;
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;

export default RecipeSearch;
