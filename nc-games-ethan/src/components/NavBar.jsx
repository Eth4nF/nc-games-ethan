import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="Nav">
            <Link to="/">
                <p className="NavLink">Home</p>
            </Link>
            <Link to="/categories">
                <p className="NavLink">Categories</p>
            </Link>
            <Link to="/addReview">
                <p className="NavLink">Add Review</p>
            </Link>
        </nav>
    )
}

export default NavBar;