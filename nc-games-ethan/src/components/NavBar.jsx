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
            <Link to="/users">
                <p className="NavLink">Users</p>
            </Link>
            {/* <Link to="/reviews">
                <p className="NavLink">Reviews</p>
            </Link> */}
        </nav>
    )
}

export default NavBar;