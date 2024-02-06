import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onCategoryChange, onSearch }) => {
    const { isLoggedIn, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = (e) => {
        e.preventDefault();
        signOut();
        navigate('/');
    };

    const handleCategoryClick = (category) => {
        onCategoryChange(category);
        return false;
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/">NEWS</NavLink>
            </div>
            <ul className="navbar-links">
                <li className="nav-item dropdown">
                    <button className="dropbtn">News</button>
                    <div className="dropdown-content">
                        <button onClick={() => handleCategoryClick('technology')}>Technology</button>
                        <button onClick={() => handleCategoryClick('health')}>Health</button>
                        <button onClick={() => handleCategoryClick('sports')}>Sports</button>
                    </div>
                </li>
            </ul>
            <div className="navbar-search">
                <input type="text" placeholder="Search..." onChange={e => onSearch(e.target.value)} />
                <button type="submit">🔍</button>
            </div>
            <div className="navbar-auth">
                {isLoggedIn ? (
                    <>
                        <button onClick={handleSignOut} className="navbar-signout">Sign Out</button>
                        <NavLink to="/profile">Profile</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/signin">Sign In</NavLink> / <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
