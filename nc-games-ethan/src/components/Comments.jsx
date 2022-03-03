import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleComment } from "../utils/api";

const Comments = () => {

    let {review_id} = useParams();

    const [singleComment, setSingleComment] = useState([]);

    useEffect(() => {
        getSingleComment(review_id)
        .then((commentFromServer) => {
            setSingleComment(commentFromServer);
        })
    }, []);

    console.log(singleComment, "bazinga");

    return (
        <div>
            <ul className="reviewLi">
                {
                    singleComment.map((element, id) => {
                        console.log(element.row, "hello")
                        let elementRow = element.row;
                        let splitElement = elementRow.split(",");
                        let moreSplitElement = splitElement[4].split(")");
                        return (
                            <li key={id}>
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