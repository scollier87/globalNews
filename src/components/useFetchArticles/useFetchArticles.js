import { useState, useEffect, useCallback } from 'react';

const useFetchArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    const fetchArticles = useCallback(async (category, searchTerm) => {
        setIsLoading(true);
        setError(null);

        let endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        if (category) {
            endpoint += `&category=${category}`;
        }
        if (searchTerm) {
            endpoint += `&q=${encodeURIComponent(searchTerm)}`;
        }

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Failed to fetch articles. Status: ${response.status}`);
            }
            const data = await response.json();

            if (data.articles) {
                setArticles(data.articles);
            } else {
                console.log('No articles found');
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError(error.toString());
        } finally {
            setIsLoading(false);
        }
    }, [apiKey]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return { articles, isLoading, error, fetchArticles };
};

export default useFetchArticles;
