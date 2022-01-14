import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./components/HomePage.jsx"
import NavBar from './components/NavBar';
import Categories from './components/Categories';
import ReviewPage from './components/ReviewPage';
import AddReview from './components/AddReview';
import FilteredCategory from './components/FilteredCategory';


function App() {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path ="/" element={<HomePage/>}/>
          <Route path ="/categories" element={<Categories/>}/>
          <Route path ="/reviews/:review_id" element={<ReviewPage/>}/>
          <Route path="/addReview" element={<AddReview/>}/>
          <Route path="/category/reviews/:category" element={<FilteredCategory/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
