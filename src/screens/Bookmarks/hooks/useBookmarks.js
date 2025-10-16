import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeBookmark, selectAllBookmarks } from '../../../store/slices/bookmarksSlice';
import { useTranslation } from '../../../i18n/useTranslation';

const useBookmarks = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const bookmarks = useAppSelector(selectAllBookmarks);
    const { t } = useTranslation();

    const handlePressItem = useCallback((item) => {
        navigation.navigate('VideoPlayer', {
            videoUrl: item.videoUrl,
            title: item.title,
            description: item.description,
        });
    }, [navigation]);

    const handleRemoveBookmark = useCallback((videoUrl) => {
        Alert.alert(
            t('bookmarks.removeTitle'),
            t('bookmarks.removeMessage'),
            [
                {
                    text: t('common.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('common.delete'),
                    style: 'destructive',
                    onPress: () => dispatch(removeBookmark(videoUrl)),
                },
            ]
        );
    }, [dispatch, t]);

    return {
        bookmarks,
        handlePressItem,
        handleRemoveBookmark,
    };
};

export default useBookmarks;