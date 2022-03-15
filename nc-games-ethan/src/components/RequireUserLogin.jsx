import { useContext } from "react";
import { UserContexts } from "../contexts/UserContexts";
import UserLogin from "./UserLogin";


const RequireUserLogin = ({ children }) => {
    console.log(UserContexts)
    const { isLoggedIn } = useContext(UserContexts);

    return isLoggedIn ? children : <UserLogin />;
};

export default RequireUserLogin;