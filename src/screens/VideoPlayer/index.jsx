import { StyleSheet, TouchableOpacity, ScrollView, View, StatusBar, ActivityIndicator } from 'react-native'
import { VideoView } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { VideoControls } from './VideoControls';
import { useNavigation, useTheme } from '@react-navigation/native';
import useVideoActions from './hooks/useVideoActions';
import useVideoPlayerInstance from './hooks/useVideoPlayerInstance';
import useFullScreenOrientation from './hooks/useFullScreenOrientation';

export const VideoPlayer = ({ route }) => {
    const { videoUrl, title, description, imageUrl, currentTime } = route.params;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const theme = useTheme()
    const { player } = useVideoPlayerInstance(videoUrl, currentTime);
    const { isFullscreen, handleFullscreenEnter, handleFullscreenExit } = useFullScreenOrientation();
    const {
        isBookmarked,
        isDownloadable,
        isDownloaded,
        isDownloading,
        handleDownload,
        handleBookmark,
    } = useVideoActions({ videoUrl, title, description, imageUrl, player });


    return (
        <ThemedView style={[styles.container, !isFullscreen ? {
            marginTop: insets.top, marginLeft: insets.left, marginRight: insets.right, marginBottom: insets.bottom,
            backgroundColor: isFullscreen ? 'black' : 'transparent'
        } : {}]}>
            <StatusBar hidden={isFullscreen} />
            <View>
                <VideoView
                    style={isFullscreen ? styles.videoFullscreen : styles.video}
                    player={player}
                    nativeControls={false}
                />
                <VideoControls
                    videoUrl={videoUrl}
                    player={player}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={() => { isFullscreen ? handleFullscreenExit() : handleFullscreenEnter(); }}
                    onExitFullscreen={() => { handleFullscreenExit(); }}
                    onGoBack={() => { navigation.goBack(); }}
                />
            </View>


            <ScrollView style={isFullscreen ? styles.contentFullscreen : styles.content} showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.header}>
                    <ThemedText type="title" style={styles.title}>{title}</ThemedText>
                    <ThemedView style={styles.iconButtons}>
                        {isDownloadable && (
                            <TouchableOpacity
                                style={[
                                    styles.iconButton,
                                    isDownloaded
                                        ? { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
                                        : isDownloading
                                            ? { backgroundColor: theme.colors.card, borderColor: theme.colors.primary, opacity: 0.7 }
                                            : { backgroundColor: theme.colors.card, borderColor: theme.colors.border }
                                ]}
                                onPress={handleDownload}
                                activeOpacity={0.7}
                                disabled={isDownloading || isDownloaded}
                            >
                                {isDownloading ? (
                                    <ActivityIndicator size="small" color={theme.colors.primary} />
                                ) : (
                                    <MaterialCommunityIcons
                                        name={isDownloaded ? "check-circle" : "download"}
                                        size={22}
                                        color={isDownloaded ? '#fff' : theme.colors.text}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={[
                                styles.iconButton,
                                isBookmarked
                                    ? { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
                                    : { backgroundColor: theme.colors.card, borderColor: theme.colors.border }
                            ]}
                            onPress={handleBookmark}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons
                                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                                size={22}
                                color={isBookmarked ? '#fff' : theme.colors.text}
                            />
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>

                <ThemedText type="default" style={styles.description}>{description}</ThemedText>
            </ScrollView>
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        aspectRatio: 16 / 9,
        backgroundColor: 'black',
    },
    videoFullscreen: {
        backgroundColor: 'black',
        height: '100%',
    },
    fullscreenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    contentFullscreen: {
        flex: 1,
        paddingHorizontal: 16,
        display: 'none',
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
        flex: 1,
        marginRight: 12,
        lineHeight: 28,
    },
    iconButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    description: {
        lineHeight: 22,
        marginBottom: 24,
    },
    videoControlsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        borderWidth: 5,
        borderColor: 'red',
    },
})