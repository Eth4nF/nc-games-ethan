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
import RequireUserLogin from "./components/RequireUserLogin";
import SortedReviews from './components/SortedReviews';
import { UserProvider } from "./contexts/UserContexts"

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
    <RequireUserLogin>
      <NavBar/>
        <Routes>
          <Route path ="/" element={<HomePage/>}/>
          <Route path ="/categories" element={<Categories/>}/>
          <Route path ="/reviews/:review_id" element={<ReviewPage/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/category/reviews/:category" element={<FilteredCategory/>}/>
          <Route path="/users/:username" element={<UserPage/>} />
          <Route path="/reviews/:sort" element={<SortedReviews/>}/>
          {/* <Route path="/reviews" element={<AllReviews/>} /> */}
        </Routes>
        </RequireUserLogin>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;
