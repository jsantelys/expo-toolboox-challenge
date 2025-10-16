import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectToken, setToken } from '../store/slices/userSlice';
import { apiService } from '../api';
import { store } from '../store';

/**
 * Hook to refresh the token on app load
 */
export const useTokenRefresh = () => {
    const currentUser = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);

    useEffect(() => {
        const refreshToken = async () => {
            if (!currentUser || !token) {
                return;
            }

            try {
                console.log('Refreshing token for user:', currentUser.id);

                apiService.setToken(token);

                const response = await apiService.refreshToken(currentUser.email);

                if (response.token && response.token !== token) {
                    store.dispatch(setToken(response.token));
                    console.log('Token refreshed successfully');
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        };

        refreshToken();
    }, [currentUser]);
};

