import React from "react";
import useFetchArticles from "../useFetchArticles/useFetchArticles";
import './NewsFeed.css';

const NewsFeed = ({ apiKey }) => {
    const { articles, isLoading, error } = useFetchArticles(apiKey, 'technology', '');

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {articles.map((article, index) => (
                <article key={index} className="article">
                    <img src={article.urlToImage} alt={article.title}/>
                    <div className="article-content">
                        <h2 className="article-title">{article.title}</h2>
                        <p className="article-description">{article.description}</p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default NewsFeed