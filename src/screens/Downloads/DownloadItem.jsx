import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { ThemedText } from '../../components/ThemedText';
import { useTranslation } from '../../i18n/useTranslation';
import { useTheme } from '@react-navigation/native';

export const DownloadItem = ({ item, onPress, onDelete }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    const statusColor = {
        pending: theme.colors.primary,
        downloading: '#4A90E2',
        completed: '#4CAF50',
        failed: '#F44336',
    }[item.status];

    const isCompleted = item.status === 'completed' && item.localUri;

    return (
        <Pressable
            onPress={() => onPress(item)}
            disabled={!isCompleted}
            style={({ pressed }) => [
                styles.downloadItem,
                isCompleted && pressed && styles.downloadItemPressed,
            ]}
        >
            <View style={styles.downloadInfo}>
                <ThemedText style={styles.title} numberOfLines={1}>
                    {item.title}
                </ThemedText>
                <View style={styles.statusRow}>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                        <Text style={styles.statusText}>{t(`downloads.status.${item.status}`)}</Text>
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
                onPress={() => onDelete(item.id, item.localUri)}
            >
                <ThemedText style={styles.deleteText}>{t('downloads.delete')}</ThemedText>
            </TouchableOpacity>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    downloadItem: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    downloadItemPressed: {
        opacity: 0.7,
        backgroundColor: '#F5F5F5',
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
});

