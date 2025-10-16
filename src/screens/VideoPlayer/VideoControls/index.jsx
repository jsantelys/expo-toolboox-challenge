import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Animated } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '../../../components/ThemedText';
import { VideoPlayer } from 'expo-video';
import useVideoControls from '../hooks/useVideoControls';
import { ErrorOverlay } from './ErrorOverlay';


export const VideoControls = ({
    videoUrl,
    player,
    isFullscreen,
    onToggleFullscreen,
    onExitFullscreen,
    onGoBack,
}) => {
    const {
        opacity,
        setProgressBarWidth,
        handleInteraction,
        handleProgressBarPress,
        formatTime,
    } = useVideoControls({ player });

    //Format not supported or video not found
    if (player.status === 'error' || !videoUrl) {
        return (
            <ErrorOverlay
                isFullscreen={isFullscreen}
                onExitFullscreen={onExitFullscreen}
                onGoBack={onGoBack}
            />
        );
    }

    return (
        <TouchableWithoutFeedback onPress={handleInteraction}>
            <View style={styles.container}>
                <Animated.View style={[styles.controlsWrapper, { opacity }]}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            onPress={isFullscreen ? onExitFullscreen : onGoBack}
                            style={styles.exitButton}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons name={isFullscreen ? "close" : "arrow-left"} size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.centerControls}>
                        {player.status === 'loading' ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <>
                                <TouchableOpacity
                                    onPress={() => { player.seekBy(-10); }}
                                    style={styles.controlButton}
                                    activeOpacity={0.7}
                                >
                                    <MaterialIcons name="replay-10" size={40} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { player.playing ? player.pause() : player.play(); }}
                                    style={styles.playPauseButton}
                                    activeOpacity={0.7}
                                >
                                    <MaterialCommunityIcons
                                        name={player.playing ? "pause" : "play"}
                                        size={50}
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { player.seekBy(10); }}
                                    style={styles.controlButton}
                                    activeOpacity={0.7}
                                >
                                    <MaterialIcons name="forward-10" size={40} color="#fff" />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    <View style={styles.bottomBar}>
                        <View style={styles.progressContainer}>
                            <ThemedText style={styles.timeText}>
                                {formatTime(player.currentTime)}
                            </ThemedText>
                            <TouchableWithoutFeedback
                                onPress={(e) => {
                                    const { locationX } = e.nativeEvent;
                                    handleProgressBarPress(locationX);
                                }}
                            >
                                <View
                                    style={styles.progressBar}
                                    onLayout={(e) => setProgressBarWidth(e.nativeEvent.layout.width)}
                                >
                                    <View style={styles.progressTrack}>
                                        <View
                                            style={[
                                                styles.progressFill,
                                                { width: `${(player.currentTime / (player.duration || 1)) * 100}%` },
                                            ]}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            <ThemedText style={styles.timeText}>
                                {formatTime(player.duration)}
                            </ThemedText>
                        </View>

                        <TouchableOpacity
                            onPress={onToggleFullscreen}
                            style={styles.fullscreenButton}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons
                                name={isFullscreen ? "fullscreen-exit" : "fullscreen"}
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    controlsWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    exitButton: {
        padding: 8,
    },
    centerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
    },
    controlButton: {
        padding: 12,
    },
    playPauseButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    progressContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressBar: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
    },
    progressTrack: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    timeText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        minWidth: 40,
    },
    fullscreenButton: {
        padding: 8,
    },
});

