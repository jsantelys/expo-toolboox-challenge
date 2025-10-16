import { useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from '../../../i18n/I18nProvider';
import { loginUser } from '../../../store/userManager';
import { apiService } from '../../../api';

export const useLogin = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            Alert.alert(t('login.emailRequired'));
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            Alert.alert(t('login.emailInvalid'));
            return;
        }

        setIsLoading(true);

        try {
            const response = await apiService.login(trimmedEmail);

            const { token } = response;

            if (!token) {
                throw new Error('Invalid response from server');
            }

            await loginUser({ id: trimmedEmail }, token, apiService);
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert(
                t('login.error') || 'Error',
                error.message || 'An error occurred during login. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        t,
        theme,
        email,
        setEmail,
        isLoading,
        handleLogin,
    };
};

