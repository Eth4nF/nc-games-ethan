import React, { useEffect, useState} from "react";
import { useParams } from "react-router";
import { getReviews } from "../utils/api";

const UserPage = () => {

    let {username} = useParams(); 

    const [userPageReviews, setUserPageReviews] = useState([]);

    useEffect(() => {
        getReviews().then((res) => {
            let allReviews = [...res] 
			let reviewArr = [];
			allReviews.filter((review) => {
				if (username === review.owner) reviewArr.push(review)
			})
			setUserPageReviews(reviewArr)
        })
    }, [])

    console.log(userPageReviews);

    return (
        <div>
            <h1 className="reviewHead">{username}</h1>
            <p className="userReviewP">List of {username}'s reviews:</p>
            <ul>
                {userPageReviews.map((element) => {
                    return (
                        <div key={element.review_id}>
                        <li>{element.title}</li>
                        <p>{element.review_body}</p>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default UserPage;