import React, { useState, useEffect } from "react";
import { timeSince } from "../../utilities/dateUtils";
import useFetchArticles from "../useFetchArticles/useFetchArticles";
import './NewsFeed.css';

const NewsFeed = ({ apiKey }) => {
    const [displayArticles, setDisplayArticles] = useState([]);
    const [articlesToDisplay, setArticlesToDisplay] = useState(9);
    const { articles, isLoading, error } = useFetchArticles(apiKey, 'technology', '');

    useEffect(() => {
        setDisplayArticles(articles.slice(0, articlesToDisplay));
    }, [articlesToDisplay, articles]);

    useEffect(() => {
        const handleScroll = () => {
            const bottomTolerance = 100;
            if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - bottomTolerance) return;
            setArticlesToDisplay(prevCount => prevCount + 9);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="news-feed">
                {displayArticles.map((article, index) => (
                    <div key={index} className="news-card">
                    <img src={article.urlToImage} alt={article.title} />
                    <div className="news-card-body">
                        <h2 className="news-card-title">{article.title}</h2>
                        <p className="news-card-content">{article.description}</p>
                    </div>
                    <div className="news-card-footer">
                        <small>{timeSince(article.publishedAt)} ago by {article.author}</small>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsFeed

//limit viewport height so not all articles visible
//track scroll position in regards to loading more articles window.innerheight window.offsetheight