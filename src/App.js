import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import RecipeDetail from './Components/RecipeDetail';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>}  />
        <Route path="/recipe/:id" element={<RecipeDetail/>} />
        
      </Routes>
    </BrowserRouter>
     
      
    </div>
  );
}

export default App;
