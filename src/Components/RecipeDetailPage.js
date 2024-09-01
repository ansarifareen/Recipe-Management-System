import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './RecipeDetailPage.css';

function RecipeDetailPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipe = recipes.find((r, index) => index === parseInt(id, 10));

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(()=>{
    //for checking that if the recipe is in favorite
    if(recipe){
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFav = favorites.some(fav => fav.title === recipe.title);
    setIsFavorite(isFav);
  }
  },[recipe]);


  const handleEditClick = () => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleToggleFavorite =(e)=>{
    const isChecked =e.target.checked;
    setIsFavorite(isChecked);
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if(isChecked){
      //Add recipe to Favourites
      if(!favorites.some(fav => fav.title === recipe.title)){
        favorites.push(recipe);
      }
    } else{
      //Remove recipe from favourites
      const updatedFavourites = favorites.filter(fav => fav.title !== recipe.title);
      localStorage.setItem('favorites',JSON.stringify(updatedFavourites));
      return;
    }
   localStorage.setItem('favorites',JSON.stringify(favorites));
  };
 
  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  return (
    <div className="Detail-Main-Container">
      <div className='detail-Heading'>Recipe Details</div>
      <div className='detail-container'>
        <h2>Title:{recipe.title}</h2>
        <p><strong>Description:</strong> {recipe.description}</p>
        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
        <p><strong>Steps:</strong> {recipe.steps}</p>
        <p><strong>Tags:</strong> {recipe.tags}</p>
        <button onClick={handleEditClick}>Edit Recipe</button>
        <label className='switch'>
          <input type='checkbox' 
          checked = {isFavorite}
          onChange={handleToggleFavorite}/>
          <span className='slider round'></span>
        </label>
        <Link to="/" className='backLink'>Back to List</Link>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
