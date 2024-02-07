import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseUrl } from '../api/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState(user !== null);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn.toString());
        localStorage.setItem('user', JSON.stringify(user));
    }, [user, isLoggedIn]);

    const updateUserState = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
        setIsLoggedIn(true);
    };

    const signIn = async (email, password) => {
        try {
            const usersResponse = await fetch(`${firebaseUrl}/users.json`);
            const users = await usersResponse.json();
            const userEntry = Object.entries(users).find(([key, user]) => user.email === email && user.password === password);
            if (userEntry) {
                const [id, userData] = userEntry;
                updateUserState({ ...userData, id });
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('SignIn error:', error);
        }
    };

    const signOut = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
    };

    const addFavorite = async (article) => {
        if (user) {
            const updatedFavorites = [...user.favorites, article];
            await updateUser({ ...user, favorites: updatedFavorites });
        }
    };

    const removeFavorite = async (articleId) => {
        if (user) {
            const updatedFavorites = user.favorites.filter(article => article.id !== articleId);
            await updateUser({ ...user, favorites: updatedFavorites });
        }
    };

    const updateUser = async (updatedUserInfo) => {
        const userId = user?.id;
        if (!userId) {
            console.error('User ID is not available for updating user info.');
            return;
        }

        try {
            const url = `${firebaseUrl}/users/${userId}.json`;
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserInfo),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('User updated successfully:', data);

            // Make sure to update only the specific fields in the user state
            setUser((prevState) => ({ ...prevState, ...updatedUserInfo }));
            localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUserInfo }));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            addFavorite,
            removeFavorite,
            isLoggedIn,
            signIn,
            signOut,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);