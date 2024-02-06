import { useState, useEffect } from 'react';

const useFetchArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                };
                const response = await fetch(endpoint, options);
                if (!response.ok) throw new Error(`Failed to fetch articles. Status: ${response.status}`);
                const data = await response.json();

                if (data.articles) {
                    const sortedArticles = data.articles.reverse();
                    setArticles(sortedArticles);
                } else {
                    console.log('No articles found');
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
                setError(error.toString());
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [apiKey]);

    return { articles, isLoading, error };
};

export default useFetchArticles;
