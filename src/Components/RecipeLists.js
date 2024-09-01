import React, { useState, useEffect } from "react";
import "./RecipeList.css";
import { useNavigate } from "react-router-dom";

function RecipeLists() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
    
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

  }, []);

  const isFavorite = (recipe) => {
    return favorites.some(fav => fav.title === recipe.title);
  };

  
  const handleCardFunction = (id)=>{
     navigate(`/recipe/${id}`);
  };
  return (
    <div className="main-section">
      <div className="main-list-container">
        <div className="heading">Recipe Lists</div>
        <div className="flex-containerOne" id="card-container">
          {recipes.map((recipe, index) => (
            <div key={index} className="card" onClick={()=>handleCardFunction(index)}>
              <h4>Title: {recipe.title}{isFavorite(recipe) && <span className="star">&#9733;</span>}</h4>
              <p>
                <span className="desc-label">Description:</span>
                <span className="desc-content">{recipe.description}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="main-list-container">
        <div className="heading">Favourite Lists</div>
        <div className="flex-containerTwo" id="card-container">
          {favorites.map((recipe,index) =>(
             <div key={index} className="card">
             <h4>Title: {recipe.title}</h4>
             <p>
               <span className="desc-label">Description:</span>
               <span className="desc-content">{recipe.description}</span>
             </p>
           </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default RecipeLists;
