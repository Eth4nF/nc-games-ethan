import React, { useContext, useEffect, useState} from "react";
import { useParams } from "react-router";
import { UserContexts } from "../contexts/UserContexts";
import { getSingleComment, getSingleReview, patchReviewById, postReviewComments } from "../utils/api";
import Comments from "./Comments";

const ReviewPage = () => {

    let {review_id} = useParams()
    const { user, isLoggedIn } = useContext(UserContexts);
    const [newComment, setNewComment] = useState('');
    const [isError, setIsError] = useState(false);
    const [reviewComments, setReviewComments] = useState([]);

    const [singleReview, setSingleReview] = useState([]);

    useEffect(() => {
        getSingleReview(review_id)
        .then((singleReviewFromServer) => {
            setSingleReview(singleReviewFromServer);
        })
    },[]);

    useEffect(() => {
        getSingleComment(review_id)
        .then((res) => {
            setReviewComments(res);
        })
        .catch((err) => [
            console.log(err)
        ])
    },  [])
    
    const handleVote = (increment) => {
        setSingleReview((currReview) => {
            console.log(currReview)
            const copyReview = currReview;
            copyReview.votes += increment;
            return copyReview;
        })
        patchReviewById(increment, review_id);
    };

    const handleCommentInput = (event) => {
		const { value } = event.target
		setNewComment(value)
	};

    const handleCommentPost = (event) => {
		setIsError(false)
		event.preventDefault();
		postReviewComments(review_id, user.username, newComment).then((res) => {
			setReviewComments((currComments) => {
				let newReviewComments = [...currComments, res]
				return newReviewComments
			})
		}).catch((err) => {
			setIsError(true)
			console.log(err)
		})
		setNewComment('')
	};

    console.log(reviewComments);

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
            {isLoggedIn ? (
                <form onSubmit={handleCommentPost} className="commentForm">
                    <label>Post a comment!</label>
                <input
                    type="text"
                    onChange={handleCommentInput}
                    placeholder="Post a comment!"
                    value={newComment}
                    />
                    <button type="submit">submit</button>
                    {isError ? <p>I'm sorry, your comment could not be posted. Please try again.</p> : null}
                </form>
            ) : null}
        </div>
    )
}

export default ReviewPage;