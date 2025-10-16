import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from '../../components/ThemedView';
import useHistory from './hooks/useHistory';
import { HistoryItem } from './HistoryItem';
import { HistoryEmpty } from './HistoryEmpty';
import { HistoryHeader } from './HistoryHeader';

const History = () => {
    const { history, handlePressItem, handleRemoveItem, handleClearHistory } = useHistory();

    const renderHistoryItem = ({ item }) => (
        <HistoryItem
            item={item}
            onPress={handlePressItem}
            onRemove={handleRemoveItem}
        />
    );

    const renderEmptyState = () => <HistoryEmpty />;

    const renderHeader = () => {
        if (history.length === 0) return null;
        return <HistoryHeader onClearHistory={handleClearHistory} />;
    };

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={history}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.videoUrl}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={[
                    styles.listContent,
                    history.length === 0 && styles.emptyListContent,
                ]}
                ListEmptyComponent={renderEmptyState}
                ListHeaderComponent={renderHeader}
            />
        </ThemedView>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    emptyListContent: {
        flexGrow: 1,
    },
});

