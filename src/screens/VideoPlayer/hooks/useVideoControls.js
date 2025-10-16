import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const CONTROLS_VISIBLE_TIME = 1500;

export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const useVideoControls = ({ player }) => {
    const [visible, setVisible] = useState(true);
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const opacity = useRef(new Animated.Value(1)).current;
    const hideTimer = useRef(null);

    const showControls = () => {
        setVisible(true);
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        resetHideTimer();
    };

    const hideControls = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
        });
    };

    const resetHideTimer = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
        }
        hideTimer.current = setTimeout(() => {
            if (player.playing) {
                hideControls();
            }
        }, CONTROLS_VISIBLE_TIME);
    };

    const handleInteraction = () => {
        if (!visible) {
            showControls();
        } else {
            resetHideTimer();
        }
    };

    const handleProgressBarPress = (locationX) => {
        if (progressBarWidth === 0) return;
        const percentage = locationX / progressBarWidth;
        const newTime = percentage * player.duration;
        player.currentTime = newTime;
    };

    useEffect(() => {
        resetHideTimer();
        return () => {
            if (hideTimer.current) {
                clearTimeout(hideTimer.current);
            }
        };
    }, [player.playing]);

    useEffect(() => {
        if (!player.playing) {
            showControls();
        }
    }, [player.playing]);


    return {
        visible,
        opacity,
        progressBarWidth,
        setProgressBarWidth,
        handleInteraction,
        handleProgressBarPress,
        formatTime,
    };
};

export default useVideoControls;