import React, {useEffect, useState} from "react";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";

const SortedReviews = () => {

    let reviewArr = [];

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews().
        then((reviewsFromServer) => {
            setReviews(reviewsFromServer)
        })
    }, [])
    
    reviews.map((element) => {
        reviewArr.push(element.votes);
    })

    let sortedReviewArr = reviewArr.sort((a,b) => b-a)

    console.log(sortedReviewArr);

    return (
        <div>
            <h1 className="reviewHead">Reviews</h1>
            <ul className="reviewList">
                {
                    reviews.map((element, id) => {
                        for (let i=0; i < sortedReviewArr.length; i++)
                        {
                            console.log(sortedReviewArr[i])
                            if (element.votes == sortedReviewArr[i])
                            {
                                return (
                                    <li key={element.review_id} className="reviewLi">
                                        <Link to={`/reviews/${element.review_id}`} className="userReviewP">Review by: {element.owner} on the game: {element.title}</Link>
                                        <p>{element.review_body}</p>
                                        <p>{`Votes: ${element.votes}`}</p>
                                    </li>
                                )
                            }
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default SortedReviews;