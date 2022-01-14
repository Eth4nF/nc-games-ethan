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

    console.log(singleComment);

    return (
        <div>
            <ul className="reviewLi">
                {
                    singleComment.map((element) => {
                        return (
                            <li>
                                {element.body}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Comments;