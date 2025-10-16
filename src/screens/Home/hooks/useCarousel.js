import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { apiService } from '../../../api';

/**
 * Hook to fetch carousel data from the API
 */
export const useCarousel = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await apiService.getCarouselData();
                setCarouselData(data);
            } catch (error) {
                console.error('Error fetching carousel data:', error);
                setError(error.message);

                Alert.alert(
                    'Error',
                    'Failed to load content. Please try again later.'
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarouselData();
    }, []);

    const refetch = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await apiService.getCarouselData();
            setCarouselData(data);
        } catch (error) {
            console.error('Error refetching carousel data:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        carouselData,
        isLoading,
        error,
        refetch,
    };
};

