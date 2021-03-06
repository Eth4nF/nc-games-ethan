import React, {useEffect, useState} from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";

const AllReviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews().
        then((reviewsFromServer) => {
            setReviews(reviewsFromServer)
        })
    }, [])

    const handleSort = () => {
        console.log("hello")
    }

    console.log(reviews)

    return (
        <div>
            <h1 className="reviewHead">Reviews</h1>
            <label htmlFor="Select option">Sort by</label>
						<select>
							<option onChange={handleSort}>Votes</option>
						</select>
            <ul className="reviewList">
                {
                    reviews.map((element, id) => {
                        return (
                            <li key={element.review_id} className="reviewLi">
                                <Link to={`/reviews/${element.review_id}`} className="userReviewP">Review by: {element.owner} on the game: {element.title}</Link>
                                <p>{element.review_body}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default AllReviews;