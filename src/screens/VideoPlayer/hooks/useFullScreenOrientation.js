import { useCallback, useEffect, useState } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';

const useFullScreenOrientation = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [orientation, setOrientation] = useState({
        orientation: ScreenOrientation.Orientation.PORTRAIT_UP,
        orientationLock: ScreenOrientation.OrientationLock.DEFAULT,
    });

    useEffect(() => {
        const getOrientation = async () => {
            const orientation = await ScreenOrientation.getOrientationAsync();
            const orientationLock = await ScreenOrientation.getOrientationLockAsync();
            setOrientation({ orientation, orientationLock });
            orientationChange({ orientationInfo: { orientation }, orientationLock });
        };
        getOrientation();
    }, []);

    useEffect(() => {
        const orientationChangeSubscription = ScreenOrientation.addOrientationChangeListener(orientationChange);
        return () => {
            orientationChangeSubscription.remove();

        };
    }, [isFullscreen]);

    const orientationChange = (event) => {
        setOrientation({ orientation: event.orientationInfo.orientation, orientationLock: event.orientationLock });
        if (!isFullscreen &&
            event.orientationInfo.orientation !== ScreenOrientation.Orientation.PORTRAIT_UP &&
            event.orientationLock !== ScreenOrientation.OrientationLock.PORTRAIT_UP) {
            setIsFullscreen(true);
        } else if (isFullscreen && event.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
            setIsFullscreen(false);
        }
    };

    const handleFullscreenEnter = useCallback(() => {
        setIsFullscreen(true);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }, []);

    const handleFullscreenExit = useCallback(() => {
        if (isFullscreen && orientation.orientation !== ScreenOrientation.Orientation.PORTRAIT_UP) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).then(() => {
                setTimeout(() => {
                    ScreenOrientation.unlockAsync();
                }, 3000);
            });
        } else {
            setIsFullscreen(false);
        }
    }, [isFullscreen, orientation]);

    return {
        isFullscreen,
        orientation,
        handleFullscreenEnter,
        handleFullscreenExit,
    };
}

export default useFullScreenOrientation;