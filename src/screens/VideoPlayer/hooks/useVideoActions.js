import { useCallback, useMemo, useRef, useEffect } from 'react';
import { useEventListener } from 'expo';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addBookmark, removeBookmark, selectIsBookmarked } from '../../../store/slices/bookmarksSlice';
import { selectDownloadById } from '../../../store/slices/downloadsSlice';
import { addToHistory, updatePlaybackPosition } from '../../../store/slices/historySlice';
import { startDownload } from '../../../services/fileSystemService';


const useVideoActions = ({ videoUrl, title, description, imageUrl, player }) => {
    const dispatch = useAppDispatch();
    const isBookmarked = useAppSelector(selectIsBookmarked(videoUrl));
    const downloadInfo = useAppSelector(selectDownloadById(videoUrl));

    const currentTimeRef = useRef(0);
    const durationRef = useRef(0);
    const hasAddedToHistoryRef = useRef(false);
    const lastUpdateTimeRef = useRef(0);

    //Only download .mp4 files since other formats are more complex cases to handle
    const isDownloadable = useMemo(() => videoUrl?.toLowerCase()?.endsWith('.mp4'), [videoUrl]);

    const handleDownload = useCallback(async () => {
        try {
            if (!isDownloadable) {
                throw new Error('Video is not downloadable');
            }
            await startDownload({
                id: videoUrl,
                videoUrl,
                title,
                description,
                imageUrl,
            });
        } catch (error) {
            console.error('Failed to start download:', error);
        }
    }, [videoUrl, title, description, imageUrl]);

    const handleBookmark = useCallback(() => {
        if (isBookmarked) {
            dispatch(removeBookmark(videoUrl));
        } else {
            dispatch(addBookmark({
                id: videoUrl,
                videoUrl,
                title,
                description,
                imageUrl,
            }));
        }
    }, [isBookmarked, dispatch, videoUrl, title, description, imageUrl]);

    // This event listener is to be able to track the video progress and add it to the history
    useEventListener(player, 'timeUpdate', (event) => {
        if (!player) return;

        const { currentTime } = event;
        const duration = player.status === 'readyToPlay' ? player.duration : 0;

        currentTimeRef.current = currentTime;
        if (duration > 0) {
            durationRef.current = duration;
        }

        if (currentTime >= 5 && !hasAddedToHistoryRef.current) {
            dispatch(addToHistory({
                id: videoUrl,
                videoUrl,
                title,
                description,
                imageUrl,
                duration: durationRef.current,
            }));
            hasAddedToHistoryRef.current = true;
        }

        const now = Date.now();
        if (hasAddedToHistoryRef.current && now - lastUpdateTimeRef.current >= 3000) {
            dispatch(updatePlaybackPosition({
                videoUrl,
                currentTime,
                duration: durationRef.current,
            }));
            lastUpdateTimeRef.current = now;
        }
    });

    useEffect(() => {
        return () => {
            if (hasAddedToHistoryRef.current && currentTimeRef.current > 0) {
                dispatch(updatePlaybackPosition({
                    videoUrl,
                    currentTime: currentTimeRef.current,
                    duration: durationRef.current,
                }));
            }
        };
    }, [dispatch, videoUrl]);

    return {
        isBookmarked,
        isDownloadable,
        isDownloaded: downloadInfo?.status === 'completed',
        isDownloading: downloadInfo?.status === 'downloading' || downloadInfo?.status === 'pending',
        downloadProgress: downloadInfo?.progress || 0,
        downloadStatus: downloadInfo?.status,
        handleDownload,
        handleBookmark,
        currentTime: currentTimeRef.current,
    };
};

export default useVideoActions;