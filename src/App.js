import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import LoginForm from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';

function App() {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const resetAndNavigate = () => {
    console.log('reset category and search terms')
    setCategory('');
    setSearchTerm('');
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar onCategoryChange={handleCategoryChange} onSearch={handleSearch} onReset={resetAndNavigate}/>
          <main>
            <Routes>
              <Route path="/" element={<NewsFeed apiKey={process.env.REACT_APP_NEWS_API_KEY} category={category} searchTerm={searchTerm} />} />
              <Route path="/signin" element={<LoginForm />} />
              <Route path="/profile" element={<Profile/>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
