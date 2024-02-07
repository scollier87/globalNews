import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [username, setUsername] = useState(user?.username || '');

    const handleUnfavorite = (articleTitle) => {
        const updatedFavorites = user.favorites.filter(fav => fav.title !== articleTitle);
        updateUser({ ...user, favorites: updatedFavorites });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ ...user, username });
        setUsername('');
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
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
                        <p>No favorites added.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
