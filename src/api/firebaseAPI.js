import { firebaseUrl } from './config';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${firebaseUrl}/users.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const addUser = async (userData) => {
    try {
      const response = await fetch(`${firebaseUrl}/users.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };