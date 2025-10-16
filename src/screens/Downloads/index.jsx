import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useTranslation } from '../../i18n/useTranslation';
import useDownloads from './hooks/useDownloads';
import { DownloadItem } from './DownloadItem';

const Downloads = () => {
    const { downloads, handlePressItem, handleDelete } = useDownloads();
    const { t } = useTranslation();

    const renderDownloadItem = ({ item }) => (
        <DownloadItem
            item={item}
            onPress={handlePressItem}
            onDelete={handleDelete}
        />
    );

    return (
        <ThemedView style={styles.container}>
            {downloads.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <ThemedText style={styles.emptyText}>{t('downloads.noDownloads')}</ThemedText>
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
    listContent: {
        padding: 16,
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