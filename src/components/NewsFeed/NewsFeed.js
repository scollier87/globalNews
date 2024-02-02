import React from "react";
import useFetchArticles from "../useFetchArticles/useFetchArticles";

const NewsFeed = ({ apiKey }) => {
    const { articles, isLoading, error } = useFetchArticles(apiKey, 'technology', '');

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {articles.map((article, index) => (
                <article key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    {/* {further details...} */}
                </article>
            ))}
        </div>
    );
};

export default NewsFeed