import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./components/HomePage.jsx"
import NavBar from './components/NavBar';
import Categories from './components/Categories';
import ReviewPage from './components/ReviewPage';
import Users from './components/Users';
import UserPage from './components/UserPage';
import FilteredCategory from './components/FilteredCategory';
import AllReviews from './components/AllReviews';


function App() {
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path ="/" element={<HomePage/>}/>
          <Route path ="/categories" element={<Categories/>}/>
          <Route path ="/reviews/:review_id" element={<ReviewPage/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/category/reviews/:category" element={<FilteredCategory/>}/>
          <Route path="/users/:username" element={<UserPage/>} />
          <Route path="/reviews" element={<AllReviews/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
