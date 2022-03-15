import { createContext, useState } from "react";

export const UserContexts = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const logout = () => {
        setUser({})
    };

    const isLoggedIn = !!user.username;

    return (
        <UserContexts.Provider value={{ user, setUser, logout, isLoggedIn }}>{children}</UserContexts.Provider>
    );
};