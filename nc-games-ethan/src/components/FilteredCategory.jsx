import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getFilteredReviews } from "../utils/api";

const FilteredCategory = () => {

    let {category} = useParams();

    const [filteredCategory, setFilteredCategory] = useState([]);

    useEffect(() => {
        getFilteredReviews(category)
        .then((filteredReviewFromServer) => {
            setFilteredCategory(filteredReviewFromServer);
        })
    }, [])

    console.log(filteredCategory);

    return (
        <div>
            <h1 className="reviewHead">{category}</h1>
            <ul className="reviewList">
                {
                    filteredCategory.map((element) => {
                        return(
                            <li key={element.review_id} className="reviewLi">
                                <img src={`${element.review_img_url}`} alt={`${element.title}`} width="100" height="100"></img>
                                <Link to={`/reviews/${element.review_id}`}>{element.title}</Link>
                                <p>{element.review_body}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default FilteredCategory;