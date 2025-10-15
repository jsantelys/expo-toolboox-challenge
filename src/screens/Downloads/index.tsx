import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllDownloads, removeDownload } from '../../store/slices/downloadsSlice';
import { deleteDownloadedFile, cancelDownload } from '../../services/fileSystemService';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

const Downloads = () => {
    const dispatch = useAppDispatch();
    const downloads = useAppSelector(selectAllDownloads);

    const handleDelete = async (id: string, localUri?: string) => {
        Alert.alert(
            'Delete Download',
            'Are you sure you want to delete this download?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await cancelDownload(id);

                        if (localUri) {
                            await deleteDownloadedFile(localUri);
                        }

                        dispatch(removeDownload(id));
                    },
                },
            ]
        );
    };

    const renderDownloadItem = ({ item }: { item: typeof downloads[0] }) => {
        const statusColor = {
            pending: '#FFA500',
            downloading: '#4A90E2',
            completed: '#4CAF50',
            failed: '#F44336',
        }[item.status];

        return (
            <ThemedView style={styles.downloadItem}>
                <View style={styles.downloadInfo}>
                    <ThemedText style={styles.title} numberOfLines={1}>
                        {item.title}
                    </ThemedText>
                    <View style={styles.statusRow}>
                        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                        <ThemedText style={styles.progress}>
                            {item.progress}%
                        </ThemedText>
                    </View>
                    {item.status === 'downloading' && (
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${item.progress}%` },
                                ]}
                            />
                        </View>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id, item.localUri)}
                >
                    <ThemedText style={styles.deleteText}>Delete</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.header}>Downloads</ThemedText>
            {downloads.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>No downloads yet</ThemedText>
                </View>
            ) : (
                <FlatList
                    data={downloads}
                    keyExtractor={(item) => item.id}
                    renderItem={renderDownloadItem}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </ThemedView>
    );
};

export default Downloads;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
    },
    listContent: {
        padding: 16,
    },
    downloadItem: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    downloadInfo: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    progress: {
        fontSize: 14,
        fontWeight: '500',
    },
    progressBar: {
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4A90E2',
    },
    deleteButton: {
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    deleteText: {
        color: '#F44336',
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        opacity: 0.6,
    },
});