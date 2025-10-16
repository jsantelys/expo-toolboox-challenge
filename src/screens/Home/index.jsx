import { FlatList, Image, StatusBar, StyleSheet, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useCarousel } from './hooks/useCarousel';
import fallbackImage from '../../assets/fallbackImage.png';

const ITEM_HEIGHT = 200;

const renderCarousel = ({ item, onPress }) => {
    return (
        <ThemedView style={styles.carouselContainer}>
            <ThemedText type="title" style={styles.carouselTitle}>{item.title}</ThemedText>
            <FlatList
                data={item.items}
                renderItem={(props) => renderCarouselItem({ ...props, type: item.type, onPress })}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
                initialNumToRender={5}
            />
        </ThemedView>
    );
};

const renderCarouselItem = ({ item, type, onPress }) => {
    const isPoster = type === 'poster';

    return (
        <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.7} style={styles.carouselItemContainer}>
            <ThemedView style={[
                styles.imageContainer,
                isPoster ? styles.posterImage : styles.thumbImage
            ]}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                    defaultSource={fallbackImage}
                />
            </ThemedView>
            <ThemedText type="defaultSemiBold" style={styles.itemTitle} numberOfLines={2}>
                {item.title}
            </ThemedText>
        </TouchableOpacity>
    );
};

export function Home() {
    const navigation = useNavigation();
    const { carouselData, isLoading, error, refetch } = useCarousel();

    const handlePressItem = (item) => {
        navigation.navigate('VideoPlayer', {
            videoUrl: item.videoUrl,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
        });
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                {isLoading && carouselData.length === 0 ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0066CC" />
                        <ThemedText style={styles.loadingText}>Loading content...</ThemedText>
                    </View>
                ) : (
                    <FlatList
                        data={carouselData}
                        renderItem={(props) => renderCarousel({ ...props, onPress: handlePressItem })}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={refetch}
                                tintColor="#0066CC"
                            />
                        }
                    />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        opacity: 0.6,
    },
    listContent: {
        paddingVertical: 20,
    },
    carouselContainer: {
        marginBottom: 30,
    },
    carouselTitle: {
        marginLeft: 20,
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    carouselContent: {
        paddingHorizontal: 16,
    },
    carouselItemContainer: {
        marginHorizontal: 4,
    },
    imageContainer: {
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#2a2a2a',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    posterImage: {
        height: ITEM_HEIGHT,
        aspectRatio: 2 / 3,
    },
    thumbImage: {
        height: ITEM_HEIGHT,
        aspectRatio: 16 / 9,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    itemTitle: {
        marginTop: 8,
    },
});

