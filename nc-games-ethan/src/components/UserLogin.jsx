import { useContext, useEffect, useState } from "react";
import { UserContexts } from "../contexts/UserContexts";
import { getUsers } from "../utils/api";

const UserLogin = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState(undefined)
    const { setUser } = useContext(UserContexts);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.users)
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

    return (
			<h1>Login</h1>
		);
};

export default UserLogin;