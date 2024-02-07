import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseUrl } from '../api/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    localStorage.setItem('user', JSON.stringify(user));
  }, [user, isLoggedIn]);

  const signIn = async (email, password) => {
    const usersResponse = await fetch(`${firebaseUrl}/users.json`);
    const users = await usersResponse.json();
    console.log('Fetched users:', users);

    const userEntry = Object.entries(users).find(([key, value]) => value.email === email && value.password === password);
    if (userEntry) {
      const [id, userData] = userEntry;
      console.log('Matching user entry:', id, userData);


      const cleanUserData = { ...userData, id };
      console.log('User data to be set:', cleanUserData);

      setUser(cleanUserData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(cleanUserData));
    } else {
      throw new Error('User not found');
    }
  };


  const signOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };

  const addUser = async (newUser) => {
    const response = await fetch(`${firebaseUrl}/users.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User added successfully:', data);

  };

  const addFavorite = async (article) => {
    if (!user || !user.id) {
      console.error("User ID is not available for adding favorites.");
      return;
    }

    const updatedFavorites = user.favorites ? [...user.favorites, article] : [article];
    await updateUser({ ...user, favorites: updatedFavorites });
  };

  const removeFavorite = async (articleId) => {
    if (!user || !user.id) {
      console.error("User ID is not available for removing favorites.");
      return;
    }

    const updatedFavorites = user.favorites.filter(article => article.id !== articleId);
    await updateUser({ ...user, favorites: updatedFavorites });
  };

  const updateUser = async (updatedUserInfo) => {
    if (!user || !user.id) {
      console.error('User ID is not available for updating user info.');
      return;
    }

    const { id, ...userInfoWithoutId } = updatedUserInfo;

    const response = await fetch(`${firebaseUrl}/users/${user.id}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfoWithoutId),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedUser = { ...user, ...userInfoWithoutId };
    console.log('User updated successfully:', updatedUser);

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };


  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      signIn,
      signOut,
      addUser,
      addFavorite,
      removeFavorite,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
