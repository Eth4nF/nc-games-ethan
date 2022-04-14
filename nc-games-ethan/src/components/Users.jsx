import React, { useEffect, useState} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUsers } from "../utils/api";
import username from "./UserLogin";

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
    console.log("running Effect");
    getUsers()
    .then((usersFromApi) => {
      console.log("data recieved");
      setUsers(usersFromApi.user);
    })
  },[])

  console.log(users)
  console.log(username)

    return (
        <div className="Users">
            <h1 className="reviewHead">Users</h1>
            <h2 className="reviewHead">{username}</h2>
            <ul className="usersList">
                {
                    users.map((element) => {
                        return (
                            <li key={element.username}>
                                <Link to={`/users/${element.username}`}>{element.username}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Users;