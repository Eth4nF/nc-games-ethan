import { useContext, useEffect, useState } from "react";
import { UserContexts } from "../contexts/UserContexts";
import { getUsers } from "../utils/api";

const UserLogin = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState(undefined)
    const { setUser } = useContext(UserContexts);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.user)
		}).catch((err) => {
			console.log(err)
		})
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser({ username });
    };
    
    const handleUserSelect = (event) => {
        const { value } = event.target
        setUsername(value);
    };

    console.log(users)

    return (
        <div>
			<h1 className="reviewHead">Login</h1>
            <form onSubmit={handleSubmit} className="loginForm">
                <label htmlFor="user">Select your username</label>
                <select
                    value={username}
                    placeholder="select a username"
                    onChange={handleUserSelect}
                >
                    <option value="">Select username...</option>
                    {users.map((user, index) => {
                        return (
                            <option key={index} value={user.username}>
                                {user.username}
                            </option>
                        );
                    })}
                    </select>
                    <button type="submit">
                        submit
                    </button>
            </form>
        </div>
		);
};

export default UserLogin;