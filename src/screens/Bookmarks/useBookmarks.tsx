import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeBookmark, selectAllBookmarks } from '../../store/slices/bookmarksSlice';

const useBookmarks = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const bookmarks = useAppSelector(selectAllBookmarks);

    const handlePressItem = useCallback((item: any) => {
        navigation.navigate('VideoPlayer', {
            videoUrl: item.videoUrl,
            title: item.title,
            description: item.description,
        });
    }, [navigation]);

    const handleRemoveBookmark = useCallback((videoUrl: string, title: string) => {
        Alert.alert(
            'Remove Bookmark',
            `Remove "${title}" from bookmarks?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => dispatch(removeBookmark(videoUrl)),
                },
            ]
        );
    }, [dispatch]);

    return {
        bookmarks,
        handlePressItem,
        handleRemoveBookmark,
    };
};

export default useBookmarks;