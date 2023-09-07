import React from 'react'
import RecipeSearch from '../Components/RecipeSearch'
import MyRecipes from '../Components/MyRecipes'
import Veggies from '../Components/Veggies'
import Vegan from '../Components/Vegan'



function Home() {
  return (
    <div>   
      <RecipeSearch/>
      <MyRecipes/>
      <Veggies/>
      <Vegan/>
    </div>
  )
}

export default Home
