import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import useBookmarks from './useBookmarks';

const ITEM_WIDTH = 160;
const ITEM_HEIGHT = 240;

const Bookmarks = () => {
    const { bookmarks, handlePressItem, handleRemoveBookmark } = useBookmarks();

    const renderBookmarkItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => handlePressItem(item)}
                activeOpacity={0.7}
                style={styles.itemContainer}
            >
                <ThemedView style={styles.imageContainer}>
                    {item.imageUrl ? (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <ThemedView style={styles.placeholderContainer}>
                            <MaterialCommunityIcons name="video-outline" size={48} color="#666" />
                        </ThemedView>
                    )}
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveBookmark(item.videoUrl, item.title)}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons name="close-circle" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                </ThemedView>
                <ThemedText
                    type="defaultSemiBold"
                    style={styles.itemTitle}
                    numberOfLines={2}
                >
                    {item.title}
                </ThemedText>
                <ThemedText
                    type="default"
                    style={styles.itemDate}
                    numberOfLines={1}
                >
                    {new Date(item.timestamp).toLocaleDateString()}
                </ThemedText>
            </TouchableOpacity>
        );
    };

    const renderEmptyState = () => {
        return (
            <ThemedView style={styles.emptyContainer}>
                <MaterialCommunityIcons name="bookmark-outline" size={80} color="#999" />
                <ThemedText type="title" style={styles.emptyTitle}>
                    No Bookmarks Yet
                </ThemedText>
                <ThemedText type="default" style={styles.emptyDescription}>
                    Videos you bookmark will appear here for easy access
                </ThemedText>
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={bookmarks}
                renderItem={renderBookmarkItem}
                keyExtractor={(item) => item.videoUrl}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.listContent,
                    bookmarks.length === 0 && styles.emptyListContent,
                ]}
                ListEmptyComponent={renderEmptyState}
                columnWrapperStyle={bookmarks.length > 0 ? styles.columnWrapper : undefined}
            />
        </ThemedView>
    );
};

export default Bookmarks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    count: {
        fontSize: 14,
        color: '#666',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
    },
    emptyListContent: {
        flexGrow: 1,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    itemContainer: {
        width: ITEM_WIDTH,
        marginBottom: 24,
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#2a2a2a',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 18,
    },
    itemDate: {
        marginTop: 4,
        fontSize: 12,
        color: '#999',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 24,
    },
    emptyDescription: {
        textAlign: 'center',
        color: '#666',
        lineHeight: 22,
    },
});