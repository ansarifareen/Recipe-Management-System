import React,{useState ,useEffect} from 'react'
import './MainPage.css'
import RecipeLists from './RecipeLists'
import AddEditForm from './AddEditForm'
import {Link} from 'react-router-dom';

function MainPage() {
  return (
      <div className='main-container'>
             <div className='Header'>
                <div>Recipe Management System</div>
                <Link to='/add-recipe' className='head-btn'>Add Recipe</Link>
            </div>
            <div className='container'>
                    <RecipeLists/>
            </div>
      </div>

  )
}
export default MainPage
