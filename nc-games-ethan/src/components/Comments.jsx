import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleComment } from "../utils/api";

const Comments = ({votes}) => {

    let {review_id} = useParams();

    const [singleComment, setSingleComment] = useState([]);

    useEffect(() => {
        getSingleComment(review_id)
        .then((commentFromServer) => {
            setSingleComment(commentFromServer);
        })
    }, []);

    return (
        <div className="commentComponent">
            <ul>
                {
                    singleComment.map((element, id) => {
                        let elementRow = element.row;
                        let splitElement = elementRow.split(",");
                        let moreSplitElement = splitElement[4].split(")");
                        return (
                            <li key={id} className="newReviewLi">
                                {moreSplitElement[0]}
                            </li>
                        )
                    })
                }
            </ul> 
        </div>
    )
}

export default Comments;