import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '../../../components/ThemedText';
import { useTranslation } from '../../../i18n/useTranslation';


export const ErrorOverlay = ({
    isFullscreen,
    onExitFullscreen,
    onGoBack,
}) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.errorOverlay}>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        onPress={isFullscreen ? onExitFullscreen : onGoBack}
                        style={styles.exitButton}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons name={isFullscreen ? "close" : "arrow-left"} size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMessageContainer}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={64} color="#fff" />
                    <ThemedText style={styles.errorMessage}>
                        {t('videoPlayer.errorMessage')}
                    </ThemedText>
                </View>

                <View style={styles.bottomBar} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    errorOverlay: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    exitButton: {
        padding: 8,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    errorMessageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        paddingHorizontal: 32,
    },
    errorMessage: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
});

