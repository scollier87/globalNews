import { useState, useEffect, useCallback } from 'react';

const useFetchArticles = (category, searchTerm) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiToken = process.env.REACT_APP_GNEWS_API_TOKEN;

    const fetchArticles = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        let endpoint = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${apiToken}`;
        if (category) {
            endpoint += `&topic=${category}`;
        }
        if (searchTerm) {
            endpoint += `&q=${encodeURIComponent(searchTerm)}`;
        }

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                const errMessage = response.status === 401 ? "Unauthorized access. Check your API token." : `Failed to fetch articles. Status: ${response.status}`;
                throw new Error(errMessage);
            }
            const data = await response.json();

            if (data.articles) {
                setArticles(data.articles);
            } else {
                setError('No articles found');
                setArticles([]);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError(error.message);
            setArticles([]);
        } finally {
            setIsLoading(false);
        }
    }, [apiToken, category, searchTerm]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return { articles, isLoading, error };
};

export default useFetchArticles;
