import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Navbar from './components/Navbar/Navbar';
// import RegisterPage from './components/RegisterPage/RegisterPage';
// import ProfilePage from './components/ProfilePage/ProfilePage';
import './App.css';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/SignIn/SignIn';

function App() {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
          <main>
            <Routes>
              <Route path="/" element={<NewsFeed apiKey={process.env.REACT_APP_NEWS_API_KEY} category={category} searchTerm={searchTerm} />} />
              <Route path="/register" element={<RegisterForm/>} />
              <Route path="/signin" element={<LoginForm />} />
              {/* <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
