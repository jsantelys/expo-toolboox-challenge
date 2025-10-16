import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from '../../i18n/useTranslation';

export const HistoryHeader = ({ onClearHistory }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <ThemedView style={styles.container}>
            <TouchableOpacity
                onPress={onClearHistory}
                activeOpacity={0.7}
                style={[
                    styles.clearButton,
                    {
                        backgroundColor: colors.primary + '20',
                        borderColor: colors.primary + '30',
                    }
                ]}
            >
                <MaterialCommunityIcons
                    name="delete-sweep"
                    size={20}
                    color={colors.primary}
                />
                <ThemedText style={[styles.clearButtonText, { color: colors.primary }]}>
                    {t('history.clear')}
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
    },
    clearButtonText: {
        fontSize: 15,
        fontWeight: '600',
    },
});

