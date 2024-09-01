import logo from './logo.svg';
import './App.css';
import MainPage from './Components/MainPage';
import AddEditForm from './Components/AddEditForm';
import RecipeDetailPage from './Components/RecipeDetailPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/'   element = {<MainPage/>}/>
        <Route  path='/add-recipe' element={<AddEditForm/>}/>
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/edit-recipe/:id" element={<AddEditForm />} />
      </Routes>
    </Router>
  );
}

export default App;


