import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./AddEditForm.css";

function AddEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState([]);

  const handleCheckBoxChange=(e)=>{
    const value = e.target.value;
    if(e.target.checked){
      setTags((prevTags)=>[...prevTags,value]);
    }else{
      setTags((prevTags)=>prevTags.filter((tag)=> tag!== value));
    }
  }

  useEffect(() => {
    if (id) {
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const recipe = recipes.find((r, index) => index === parseInt(id, 10));
      if (recipe) {
        setTitle(recipe.title);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setSteps(recipe.steps);
        setTags(Array.isArray(recipe.tags) ? recipe.tags : []);
      }
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const recipe = {
      title,
      description,
      ingredients,
      steps,
      tags,
    };

    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    if (id !== undefined) {
      recipes[parseInt(id, 10)] = recipe;
    } else {
      recipes.push(recipe);
    }
    localStorage.setItem("recipes", JSON.stringify(recipes));
    navigate("/");
  };

  return (
    <div className="Add-Container">
      <div className="Add-Heading">
        Add/Edit Recipe
        <Link to="/" className="homeLink">
          Home
        </Link>
      </div>
      <div className="Styleform">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="myTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="mydescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              id="myingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="steps">Steps</label>
            <textarea
              id="mysteps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              rows="7"
              required
            />
          </div>
          {/* <div className="form-row">
            <label htmlFor="tags">Tags</label>
            <select
              id="mytags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="gluten-free">Gluten-Free</option>
              <option value="vegan">Vegan</option>
            </select>
          </div> */}
          <div className="form-row tags-container">
            <label htmlFor="tags">Tags</label>
            <div id="mytags" className="tags">
              <label>
                <input
                  type="checkbox"
                  value="vegetarian"
                  checked={tags.includes("vegetarian")}
                  onChange={(e) => handleCheckBoxChange(e)}
                />
                Vegetarian
              </label>
              {/* <br /> */}
              <label>
                <input
                  type="checkbox"
                  value="gluten-free"
                  checked={tags.includes("gluten-free")}
                  onChange={(e) => handleCheckBoxChange(e)}
                />
                glutan-free
              </label>
              {/* <br /> */}
              <label>
                <input
                  type="checkbox"
                  value="vegan"
                  checked={tags.includes("vegan")}
                  onChange={(e) => handleCheckBoxChange(e)}
                />
                Vegan
              </label>
              <br />
            </div>
          </div>

          <div>
            <input type="submit" value="Save Recipe" className="sub" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditForm;
