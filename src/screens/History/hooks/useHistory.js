import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeFromHistory, clearHistory, selectAllHistory } from '../../../store/slices/historySlice';
import { useTranslation } from '../../../i18n/useTranslation';

const useHistory = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectAllHistory);
    const { t } = useTranslation();

    const handlePressItem = useCallback((item) => {
        navigation.navigate('VideoPlayer', {
            videoUrl: item.videoUrl,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            currentTime: item.currentTime,
        });
    }, [navigation]);

    const handleRemoveItem = useCallback((videoUrl) => {
        Alert.alert(
            t('common.delete'),
            t('history.clearMessage'),
            [
                {
                    text: t('common.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('common.delete'),
                    style: 'destructive',
                    onPress: () => dispatch(removeFromHistory(videoUrl)),
                },
            ]
        );
    }, [dispatch, t]);

    const handleClearHistory = useCallback(() => {
        Alert.alert(
            t('history.clearTitle'),
            t('history.clearMessage'),
            [
                {
                    text: t('common.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('history.clear'),
                    style: 'destructive',
                    onPress: () => dispatch(clearHistory()),
                },
            ]
        );
    }, [dispatch, t]);

    return {
        history,
        handlePressItem,
        handleRemoveItem,
        handleClearHistory,
    };
};

export default useHistory;

