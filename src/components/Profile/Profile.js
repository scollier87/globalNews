import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [username, setUsername] = useState(user?.username || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ username });
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
        </div>
    );
};

export default Profile;
