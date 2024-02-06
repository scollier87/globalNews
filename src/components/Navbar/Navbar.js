import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onReset, onCategoryChange, onSearch }) => {
    const { isLoggedIn, signOut } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSignOut = (e) => {
        e.preventDefault();
        console.log('Signing out...');
        signOut();
        console.log('User signed out. Navigating to home...');
        navigate('/');
    };

    const handleCategoryClick = (category) => {
        console.log(`Category clicked: ${category}`);
        onCategoryChange(category);
    };

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
        console.log(`Search input: ${e.target.value}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(`Submitting search for: ${searchTerm}`);
        onSearch(searchTerm);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={onReset}>
                <NavLink to="/">NEWS</NavLink>
            </div>
            <ul className="navbar-links">
                <li className="nav-item dropdown">
                    <button className="dropbtn">News</button>
                    <div className="dropdown-content">
                        <button onClick={() => handleCategoryClick('business')}>Business</button>
                        <button onClick={() => handleCategoryClick('entertainment')}>Entertainment</button>
                        <button onClick={() => handleCategoryClick('general')}>General</button>
                        <button onClick={() => handleCategoryClick('health')}>Health</button>
                        <button onClick={() => handleCategoryClick('science')}>Science</button>
                        <button onClick={() => handleCategoryClick('sports')}>Sports</button>
                        <button onClick={() => handleCategoryClick('technology')}>Technology</button>
                    </div>
                </li>
            </ul>
            <div className="navbar-extra">
                {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
                <form className="navbar-search" onSubmit={handleSearchSubmit}> {/* Use form for search */}
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchInput} />
                    <button type="submit">🔍</button> {/* Submit button triggers form submission */}
                </form>
                <div className="navbar-auth">
                    {isLoggedIn ? (
                        <button onClick={handleSignOut} className="navbar-signout">Sign Out</button>
                    ) : (
                        <NavLink to="/signin">Sign In</NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;