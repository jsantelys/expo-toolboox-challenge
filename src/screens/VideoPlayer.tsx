import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const VideoPlayer = ({ route }: { route: { params: { videoUrl: string, title: string, description: string } } }) => {
    const { videoUrl, title, description } = route.params;
    const videoRef = useRef<VideoView>(null);
    const player = useVideoPlayer(videoUrl, (_player) => {
        _player.play();
    });

    const insets = useSafeAreaInsets();

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const orientationChangeSubscription = ScreenOrientation.addOrientationChangeListener(orientationChange);

        return () => {
            orientationChangeSubscription.remove();
        };
    }, []);

    const orientationChange = useCallback((event: ScreenOrientation.OrientationChangeEvent) => {
        if (!isFullscreen && event.orientationInfo.orientation !== ScreenOrientation.Orientation.PORTRAIT_UP) {
            videoRef.current?.enterFullscreen();
        }
    }, [isFullscreen]);

    const handleDownload = () => {
        // TODO: Implement download functionality
        console.log('Download button pressed');
    };

    const handleBookmark = () => {
        // TODO: Implement bookmark functionality
        setIsBookmarked(!isBookmarked);
        console.log('Bookmark button pressed');
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={[styles.container, { paddingTop: insets.top }]}>
                {videoUrl && <VideoView
                    ref={videoRef}
                    player={player}
                    style={styles.video}
                    onFullscreenEnter={() => {
                        setIsFullscreen(true);
                    }}
                    onFullscreenExit={() => {
                        setIsFullscreen(false);
                    }}
                    fullscreenOptions={
                        {
                            enable: true,
                            orientation: 'landscape',
                            autoExitOnRotate: true,
                        }
                    }
                />}

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.iconButtons}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={handleDownload}
                                activeOpacity={0.7}
                            >
                                <MaterialCommunityIcons name="file-download" size={24} color="#666" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={handleBookmark}
                                activeOpacity={0.7}
                            >
                                <MaterialCommunityIcons
                                    name={isBookmarked ? "bookmark" : "bookmark-outline"}
                                    size={24}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.description}>{description}</Text>
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    video: {
        aspectRatio: 16 / 9,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1C1C1E',
        flex: 1,
        marginRight: 12,
        lineHeight: 28,
    },
    iconButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: 16,
        color: '#48484A',
        lineHeight: 22,
        marginBottom: 24,
    },
})