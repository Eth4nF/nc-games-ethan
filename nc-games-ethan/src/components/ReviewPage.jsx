import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleReview, patchReviewById } from "../utils/api";
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
    
    const handleVote = (increment) => {
        setSingleReview((currReview) => {
            console.log(currReview)
            const copyReview = currReview;
            copyReview.votes += increment;
            return copyReview;
        })
        patchReviewById(increment, review_id);
    }

    console.log(singleReview);

    return (
        <div>
            <h1 className="reviewHead">Review</h1>
            <ul className="reviewList">
            <li key={review_id} className="reviewLi">
                <img src={`${singleReview.review_img_url}`} alt={`${singleReview.title}`} width="100" height="100"></img>
                <p>{singleReview.review_body}</p>
                <p>Votes: {singleReview.votes}</p>
                <button onClick={() => {
                    handleVote(1);
                }}>Vote +</button>
            </li>
            </ul>
            <div className="commentsBox">
                <p className="commentText">Comments:</p>
                <Comments /> 
            </div>
        </div>
    )
}

export default ReviewPage;