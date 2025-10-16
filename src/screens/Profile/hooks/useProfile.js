import { Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from '../../../i18n/I18nProvider';
import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/slices/userSlice';
import { logoutUser } from '../../../store/userManager';
import { apiService } from '../../../api';

export const useProfile = () => {
    const { t, locale, setLocale } = useTranslation();
    const currentUser = useAppSelector(selectCurrentUser);
    const theme = useTheme();

    const handleLanguageChange = (lang) => {
        setLocale(lang);
    };

    const handleLogout = () => {
        Alert.alert(
            t('profile.logoutConfirm'),
            t('profile.logoutMessage'),
            [
                {
                    text: t('common.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('profile.logout'),
                    style: 'destructive',
                    onPress: async () => {
                        await logoutUser(apiService);
                    },
                },
            ]
        );
    };

    return {
        t,
        locale,
        currentUser,
        theme,
        handleLanguageChange,
        handleLogout,
    };
};

