import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ThemeContext } from '../../Theme/ThemeContext';
import ThemeToggle from '../../Theme/ThemeToggle';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const { theme } = useContext(ThemeContext);
    const [username, setUsername] = useState(user?.username || '');

    useEffect(() => {
        setUsername(user?.username || '');
    }, [user])

    const handleUnfavorite = (articleTitle) => {
        const updatedFavorites = user.favorites.filter(fav => fav.title !== articleTitle);
        updateUser({ ...user, favorites: updatedFavorites });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ ...user, username });
        setUsername(user.username);
    };

    return (
        <div className={`profile-container ${theme}`}>
            <h2>{username}'s Profile</h2>
            <form className="profile-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <button type="submit">Update</button>
            </form>
            <div className="favorites-container">
                <h3>Favorites</h3>
                <ul className='favorites-list'>
                    {user.favorites && user.favorites.length > 0 ? (
                        user.favorites.map((fav, index) => (
                            <li key={index}>
                                <span>
                                    <a href={fav.url} target="_blank" rel="noopener noreferrer">
                                        {fav.title}
                                    </a>
                                </span>
                                <button onClick={() => handleUnfavorite(fav.title)}>Unfavorite</button>
                            </li>
                        ))
                    ) : (
                        <p>No favorites added yet.</p>
                    )}
                </ul>
            </div>
            <ThemeToggle/>
        </div>
    );
};

export default Profile;
