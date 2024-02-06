import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const isUserLoggedIn = localStorage.getItem('isLoggedIn');
        return isUserLoggedIn === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    }, [isLoggedIn]);

    const signOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
