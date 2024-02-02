import { useState, useEffect } from 'react';

const useFetchArticles = (category = 'general', searchTerm = '') => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let endpoint = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
                if (searchTerm) {
                    endpoint = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${apiKey}`;
                }
                const response = await fetch(endpoint);
                if(!response.ok) throw new Error('Failed to fetch articles.');
                const data = await response.json();
                setArticles(data.articles);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, [apiKey, category, searchTerm]);
    return { articles, isLoading, error};
};

export default useFetchArticles;