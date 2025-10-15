import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { VideoView } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import usePlayer from './usePlayer';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

export const VideoPlayer = ({ route }: { route: { params: { videoUrl: string, title: string, description: string, imageUrl?: string } } }) => {
    const { videoUrl, title, description, imageUrl } = route.params;
    const insets = useSafeAreaInsets();

    const {
        videoRef,
        player,
        isBookmarked,
        handleDownload,
        handleBookmark,
        handleFullscreenEnter,
        handleFullscreenExit,
    } = usePlayer({ videoUrl, title, description, imageUrl });

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
            <VideoView
                ref={videoRef}
                player={player}
                style={styles.video}
                onFullscreenEnter={handleFullscreenEnter}
                onFullscreenExit={handleFullscreenExit}
                fullscreenOptions={
                    {
                        enable: true,
                        orientation: 'landscape',
                        autoExitOnRotate: true,
                    }
                }
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.header}>
                    <ThemedText type="title" style={styles.title}>{title}</ThemedText>
                    <ThemedView style={styles.iconButtons}>
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
        lineHeight: 22,
        marginBottom: 24,
    },
})