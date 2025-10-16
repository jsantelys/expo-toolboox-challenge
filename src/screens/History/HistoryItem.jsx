import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { getTimeAgo } from '../../store/slices/historySlice';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

export const HistoryItem = ({ item, onPress, onRemove }) => {
    const { colors } = useTheme();
    const progress = item.duration ? (item.currentTime / item.duration) * 100 : 0;
    const watchedMinutes = Math.floor(item.currentTime / 60);
    const totalMinutes = Math.floor(item.duration / 60);

    return (
        <View style={[styles.container, { width: ITEM_WIDTH }]}>
            <TouchableOpacity
                onPress={() => onPress(item)}
                activeOpacity={0.8}
                style={[styles.card, { backgroundColor: colors.card }]}
            >
                <ThemedView style={styles.thumbnailContainer}>
                    {item.imageUrl ? (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.thumbnail}
                            resizeMode="cover"
                        />
                    ) : (
                        <ThemedView style={[styles.placeholderContainer, { backgroundColor: colors.border }]}>
                            <MaterialCommunityIcons
                                name="video-outline"
                                size={48}
                                color={colors.text + '30'}
                            />
                        </ThemedView>
                    )}

                    {progress > 0 && (
                        <View style={styles.progressOverlay}>
                            <View style={styles.progressBarContainer}>
                                <View
                                    style={[
                                        styles.progressBar,
                                        {
                                            width: `${progress}%`,
                                            backgroundColor: colors.primary
                                        }
                                    ]}
                                />
                            </View>
                        </View>
                    )}

                    {item.duration > 0 && (
                        <View style={styles.durationBadge}>
                            <ThemedText style={styles.durationText}>
                                {watchedMinutes}/{totalMinutes}m
                            </ThemedText>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[styles.deleteButton, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}
                        onPress={() => onRemove(item.videoUrl)}
                        activeOpacity={0.8}
                    >
                        <MaterialCommunityIcons
                            name="close"
                            size={18}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.contentContainer}>
                    <ThemedText
                        type="defaultSemiBold"
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {item.title}
                    </ThemedText>
                    <View style={styles.metaContainer}>
                        <MaterialCommunityIcons
                            name="clock-time-four-outline"
                            size={14}
                            color={colors.text + '70'}
                        />
                        <ThemedText
                            style={[styles.timeAgo, { color: colors.text + '70' }]}
                            numberOfLines={1}
                        >
                            {getTimeAgo(item.watchedAt)}
                        </ThemedText>
                    </View>
                </ThemedView>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    thumbnailContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderWidth: 1
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 2,
    },
    durationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    durationText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        left: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 6,
        minHeight: 36,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeAgo: {
        fontSize: 12,
    },
});

