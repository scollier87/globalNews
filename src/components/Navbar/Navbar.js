import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onReset, onCategoryChange, onSearch }) => {
    const { isLoggedIn, signOut, user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSignOut = (e) => {
        e.preventDefault();
        signOut();
        navigate('/');
        onReset();
    };

    const handleCategoryClick = (category) => {
        onCategoryChange(category);
        setSearchTerm('');
        navigate('/');
    };

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchTerm('');
    };

    const handleLogoClick = () => {
        onReset();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={handleLogoClick}>
                G-NEWS
            </div>
            <ul className="navbar-links">
                <li className="nav-item dropdown">
                    <button className="dropbtn">Categories</button>
                    <div className="dropdown-content">
                        {['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'].map(category => (
                            <button key={category} onClick={() => handleCategoryClick(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</button>
                        ))}
                    </div>
                </li>
            </ul>
            <div className="navbar-extra">
                {isLoggedIn && (
                    <>
                        <NavLink to="/profile">{user ? `Profile (${user.username})` : 'Profile'}</NavLink>
                        <button onClick={handleSignOut} className="navbar-signout">Sign Out</button>
                    </>
                )}
                {!isLoggedIn && (
                    <NavLink to="/signin">Sign In</NavLink>
                )}
                <form className="navbar-search" onSubmit={handleSearchSubmit}>
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchInput} />
                    <button type="submit">🔍</button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;