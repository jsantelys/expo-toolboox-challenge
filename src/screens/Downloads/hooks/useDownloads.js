import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAllDownloads, removeDownload } from '../../../store/slices/downloadsSlice';
import { deleteDownloadedFile, cancelDownload } from '../../../services/fileSystemService';
import { useTranslation } from '../../../i18n/useTranslation';

const useDownloads = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const downloads = useAppSelector(selectAllDownloads);
    const { t } = useTranslation();

    const handlePressItem = useCallback((item) => {
        if (item.status === 'completed' && item.localUri) {
            navigation.navigate('VideoPlayer', {
                videoUrl: item.localUri,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
            });
        }
    }, [navigation]);

    const handleDelete = useCallback(async (id, localUri) => {
        Alert.alert(
            t('downloads.deleteTitle'),
            t('downloads.deleteMessage'),
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('downloads.delete'),
                    style: 'destructive',
                    onPress: async () => {
                        await cancelDownload(id);

                        if (localUri) {
                            await deleteDownloadedFile(localUri);
                        }

                        dispatch(removeDownload(id));
                    },
                },
            ]
        );
    }, [dispatch, t]);

    return {
        downloads,
        handlePressItem,
        handleDelete,
    };
};

export default useDownloads;

