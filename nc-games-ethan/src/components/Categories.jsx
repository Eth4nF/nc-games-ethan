import React, { useState, useEffect } from "react";
import { getCategories } from "../utils/api";
import { Link } from "react-router-dom";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        console.log("running effect");
        getCategories()
        .then((categoriesFromServer) => {
            console.log("data recieved");
            setCategories(categoriesFromServer);
        })
    },[])

    console.log(categories);

    return (
        <div>
            <h1 className="categoriesHead">Categories</h1>
            <p className="categoriesHeadTwo">Here you can select a link below to filter the reviews for a list of reviews on games that fall under the specified category:</p>
                <ul className="categoriesList">
                {
                    categories.map((element) => {
                        return (
                            <li key={element.slug}>
                                <Link to={`/category/reviews/${element.slug}`}>{element.slug}</Link>
                            </li>
                        )
                    })
                }
                </ul>
        </div>
    )
}

export default Categories;