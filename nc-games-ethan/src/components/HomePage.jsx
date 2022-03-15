import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../utils/api";

const HomePage = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log("running Effect");
    getReviews()
    .then((reviewsFromServer) => {
      console.log("data recieved");
      setReviews(reviewsFromServer);
    })
  },[])

  console.log(reviews)

    return (
      <div >
        <h1 className="reviewHead">HomePage</h1>
        <button className="voteSort" onClick={handleButton()}>Sort By Votes</button>
          <ul className="reviewList">
            {
              reviews.map((element) => {
                return (
                  <li key={element.review_id} className="reviewLi">
                    <Link to={`/reviews/${element.review_id}`} className ="reviewLink">{element.title}</Link>
                    <img src={`${element.review_img_url}`} alt={`${element.title}`} width="200" height="200" className="reviewImg"></img>
                    <p className="reviewPara">Review by: {element.owner}</p>
                  </li>
                )
              })
            }
          </ul>
      </div>
    );
  };

export default HomePage;