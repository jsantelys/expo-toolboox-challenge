import * as FileSystem from 'expo-file-system/legacy';
import { store } from '../store';
import {
    addDownload,
    updateDownloadProgress,
    completeDownload,
    failDownload,
} from '../store/slices/downloadsSlice';

const activeDownloads = new Map();

const generateSafeFilename = (url) => {
    const extensionMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
    const extension = extensionMatch ? extensionMatch[1] : 'mp4';

    const sanitized = url
        .replace(/[^a-zA-Z0-9]/g, '_')
        .substring(0, 100);

    const timestamp = Date.now();
    return `video_${sanitized}_${timestamp}.${extension}`;
};

export const startDownload = async ({
    id,
    videoUrl,
    title,
    description,
    imageUrl,
}) => {
    try {

        const fileName = generateSafeFilename(videoUrl);
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        const downloadResumable = FileSystem.createDownloadResumable(
            videoUrl,
            fileUri,
            {},
            (downloadProgress) => {
                const progress =
                    downloadProgress.totalBytesWritten /
                    downloadProgress.totalBytesExpectedToWrite;
                const progressPercentage = Math.floor(progress * 100);

                store.dispatch(
                    updateDownloadProgress({
                        id,
                        progress: progressPercentage,
                    })
                );
            }
        );

        activeDownloads.set(id, downloadResumable);

        store.dispatch(
            addDownload({
                id,
                title,
                videoUrl,
                description,
                localUri: fileUri,
                savable: downloadResumable.savable(),
            })
        );

        const result = await downloadResumable.downloadAsync();

        if (result?.uri) {
            store.dispatch(
                completeDownload({
                    id,
                    localUri: result.uri,
                })
            );
        }

        activeDownloads.delete(id);
    } catch (error) {
        console.error('Download failed:', error);
        store.dispatch(failDownload(id));
        activeDownloads.delete(id);
    }
};

export const pauseDownload = async (id) => {
    const downloadResumable = activeDownloads.get(id);
    if (downloadResumable) {
        try {
            await downloadResumable.pauseAsync();
        } catch (error) {
            console.error('Failed to pause download:', error);
        }
    }
};

export const resumeDownload = async (id) => {
    const downloadResumable = activeDownloads.get(id);
    if (downloadResumable) {
        try {
            const result = await downloadResumable.resumeAsync();
            if (result?.uri) {
                store.dispatch(
                    completeDownload({
                        id,
                        localUri: result.uri,
                    })
                );
                activeDownloads.delete(id);
            }
        } catch (error) {
            console.error('Failed to resume download:', error);
            store.dispatch(failDownload(id));
            activeDownloads.delete(id);
        }
    }
};

export const cancelDownload = async (id) => {
    const downloadResumable = activeDownloads.get(id);
    if (downloadResumable) {
        try {
            await downloadResumable.cancelAsync();
            activeDownloads.delete(id);
        } catch (error) {
            console.error('Failed to cancel download:', error);
        }
    }
};

export const deleteDownloadedFile = async (localUri) => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        if (fileInfo.exists) {
            await FileSystem.deleteAsync(localUri);
        }
    } catch (error) {
        console.error('Failed to delete file:', error);
    }
};

export const fileExists = async (localUri) => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        return fileInfo.exists;
    } catch (error) {
        console.error('Failed to check file existence:', error);
        return false;
    }
};

