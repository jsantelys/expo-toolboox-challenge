import { useCallback, useEffect, useRef, useState } from 'react';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addBookmark, removeBookmark, selectIsBookmarked } from '../../store/slices/bookmarksSlice';
import { startDownload } from '../../services/fileSystemService';

interface UsePlayerParams {
    videoUrl: string;
    title: string;
    description: string;
    imageUrl?: string;
}

const usePlayer = ({ videoUrl, title, description, imageUrl }: UsePlayerParams) => {
    const videoRef = useRef<VideoView>(null);
    const player = useVideoPlayer(videoUrl, (_player) => {
        _player.play();
    });

    const dispatch = useAppDispatch();
    const isBookmarked = useAppSelector(selectIsBookmarked(videoUrl));
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [orientation, setOrientation] = useState({
        orientation: ScreenOrientation.Orientation.PORTRAIT_UP,
        orientationLock: ScreenOrientation.OrientationLock.DEFAULT,
    });

    useEffect(() => {

        const playerSubscription = player.addListener('statusChange', ({ status, error }) => {
            console.log("player statusChange", status, error);
        });
        const orientationChangeSubscription = ScreenOrientation.addOrientationChangeListener(orientationChange);


        const getOrientation = async () => {
            const orientation = await ScreenOrientation.getOrientationAsync();
            const orientationLock = await ScreenOrientation.getOrientationLockAsync();
            console.log("getOrientation", orientation, orientationLock);
            setOrientation({ orientation, orientationLock });
            orientationChange({ orientationInfo: { orientation }, orientationLock });
        };
        getOrientation();

        return () => {
            orientationChangeSubscription.remove();
            playerSubscription.remove();
        };
    }, []);

    const orientationChange = useCallback((event: ScreenOrientation.OrientationChangeEvent) => {
        setOrientation({ orientation: event.orientationInfo.orientation, orientationLock: event.orientationLock });
        console.log("orientationChange", isFullscreen, orientation);
        console.log("event.orientationInfo.orientation", event.orientationInfo.orientation !== ScreenOrientation.Orientation.PORTRAIT_UP
            , ScreenOrientation.Orientation.PORTRAIT_UP,
            event.orientationInfo.orientation,
        );
        if (!isFullscreen &&
            event.orientationInfo.orientation !== ScreenOrientation.Orientation.PORTRAIT_UP &&
            orientation.orientationLock !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
            console.log("enterFullscreen");
            videoRef.current?.enterFullscreen();
            setIsFullscreen(true);
        }
    }, [isFullscreen]);

    const handleFullscreenEnter = useCallback(() => {
        setIsFullscreen(true);
        console.log("handleFullscreenEnter", isFullscreen, orientation);
    }, []);

    const handleFullscreenExit = useCallback(() => {
        console.log("handleFullscreenExit", isFullscreen, orientation);
        if (isFullscreen && orientation.orientation !== ScreenOrientation.Orientation.PORTRAIT_UP) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).then(() => {
                setTimeout(() => {
                    ScreenOrientation.unlockAsync();
                }, 3000);
            });
        }
        setIsFullscreen(false);
    }, [isFullscreen, orientation]);

    const handleDownload = useCallback(async () => {
        try {
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

    return {
        videoRef,
        player,
        isFullscreen,
        isBookmarked,
        handleDownload,
        handleBookmark,
        handleFullscreenEnter,
        handleFullscreenExit,
    };
};

export default usePlayer;