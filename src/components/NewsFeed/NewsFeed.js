import React, { useEffect } from "react";
// import useFetchArticles from "../useFetchArticles/useFetchArticles"; // Comment out if not using API
import mockData from "../../data/mock_data.json"; // comment out when using API
import './NewsFeed.css';
import { timeSince } from "../../utilities/dateUtils";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const NewsFeed = ({ apiKey, category, searchTerm }) => {
    // const { articles, isLoading, error } = useFetchArticles(category, searchTerm); // Comment out if using mock data
    const articles = mockData.articles; // Use mock data
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    // Initialize favorites in user object if it doesn't exist
    useEffect(() => {
        if (user && !user.favorites) {
            updateUser({ ...user, favorites: [] });
        }
    }, [user, updateUser]);

    const handleFavoriteToggle = (article) => {
        if (!user) {
            navigate('/signin');
            return;
        }

        const isFavorite = user.favorites.some(fav => fav.title === article.title);
        const updatedFavorites = isFavorite
            ? user.favorites.filter(fav => fav.title !== article.title)
            : [...user.favorites, article];

        updateUser({ ...user, favorites: updatedFavorites });
    }

    return (
        <div>
            {/* Comment out isLoading and error states if not using API
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            */}
            <div className="news-feed">
                {articles.map((article, index) => (
                    <div key={index} className="news-card">
                        <img src={article.image} alt={article.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                        <div className="news-card-body">
                            <h2 className="news-card-title">{article.title}</h2>
                            <p className="news-card-content">{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="view-more-link">View More</a>
                        </div>
                        <div className="news-card-footer">
                            <small>Published {timeSince(new Date(article.publishedAt))} ago by {article.source.name || 'Unknown'}</small>
                        </div>
                        <button onClick={() => handleFavoriteToggle(article)}>
                            {user && user.favorites && user.favorites.some(fav => fav.title === article.title) ? 'Unfavorite' : 'Favorite'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsFeed;



//limit viewport height so not all articles visible
//track scroll position in regards to loading more articles window.innerheight window.offsetheight