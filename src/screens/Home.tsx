import { Button, Text } from '@react-navigation/elements';
import { Alert, FlatList, Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { generateMockCarousels } from '../utils/mockData';
import { useNavigation } from '@react-navigation/native';

const mockData = generateMockCarousels(8, 50);

const ITEM_HEIGHT = 200;

const renderCarousel = ({ item, onPress }: { item: any, onPress: (item: any) => void }) => {
  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <FlatList
        data={item.items}
        renderItem={(props) => renderCarouselItem({ ...props, type: item.type, onPress })}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
      />
    </View>
  );
};

const renderCarouselItem = ({ item, type, onPress }: { item: any; type: string, onPress: (item: any) => void }) => {
  const isPoster = type === 'poster';

  return (
    <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.7} style={styles.carouselItemContainer}>
      <View style={[
        styles.imageContainer,
        isPoster ? styles.posterImage : styles.thumbImage
      ]}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.itemTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export function Home() {
  const navigation = useNavigation();

  const handlePressItem = (item: any) => {
    if (!item.videoUrl) {
      Alert.alert('No video URL');
      return;
    }
    navigation.navigate('VideoPlayer', {
      videoUrl: item.videoUrl,
      title: item.title,
      description: item.description,
    });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <FlatList
          data={mockData}
          renderItem={(props) => renderCarousel({ ...props, onPress: handlePressItem })}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 20,
  },
  carouselContainer: {
    marginBottom: 30,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: '700',
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
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
});
