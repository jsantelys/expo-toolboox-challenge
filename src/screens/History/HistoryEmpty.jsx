import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from '../../i18n/useTranslation';

export const HistoryEmpty = () => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={[styles.iconContainer, { backgroundColor: colors.border }]}>
                <MaterialCommunityIcons
                    name="history"
                    size={64}
                    color={colors.text + '60'}
                />
            </ThemedView>
            <ThemedText type="title" style={styles.title}>
                {t('history.noHistory')}
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.text + '80' }]}>
                Videos you watch will appear here
            </ThemedText>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 60,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        marginBottom: 8,
        fontSize: 24,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
});

