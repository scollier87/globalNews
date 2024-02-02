import React from "react";
import { timeSince } from "../../utilities/dateUtils";
import useFetchArticles from "../useFetchArticles/useFetchArticles";
import './NewsFeed.css';

const NewsFeed = ({ apiKey }) => {
    const { articles, isLoading, error } = useFetchArticles(apiKey, 'technology', '');

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="news-feed">
                {articles.map((article, index) => (
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