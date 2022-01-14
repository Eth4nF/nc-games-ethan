import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleReview } from "../utils/api";
import Comments from "./Comments";

const ReviewPage = () => {

    let {review_id} = useParams()

    const [singleReview, setSingleReview] = useState([]);

    useEffect(() => {
        getSingleReview(review_id)
        .then((singleReviewFromServer) => {
            setSingleReview(singleReviewFromServer);
        })
    },[]);

    console.log(singleReview);

    return (
        <div>
            <h1 className="reviewHead">Review</h1>
            <ul className="reviewList">
            <li key={review_id} className="reviewLi">
                <img src={`${singleReview.review_img_url}`} alt={`${singleReview.title}`} width="100" height="100"></img>
                <p>{singleReview.review_body}</p>
                <p>Comments:</p>
                <Comments></Comments>
            </li>
            </ul>
        </div>
    )
}

export default ReviewPage;