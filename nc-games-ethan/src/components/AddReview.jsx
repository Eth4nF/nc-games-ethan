import React, { useEffect, useState} from "react";
import { useParams } from "react-router";
import { getSingleUser } from "../utils/api";

const User = () => {

    return (
        <div className="addReview">
            <h1 className="reviewHead">Add Review</h1>
            <form className="reviewForm">
                <label for="userName">Username:</label>
                <input type="text" id="userName" name="userName"></input>
                <label for="review">Review:</label>
                <input type="text" id="reviewText" name="reviewText"></input><br></br>
                <input type="submit" value="submit"></input>
            </form>
        </div>
    )
}

export default User;