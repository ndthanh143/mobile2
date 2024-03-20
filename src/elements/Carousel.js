
import { View, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const MyCarousel = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={300}
      loop={true} // cho phép chạy vô hạn
      autoplay={true} // tự động chuyển ảnh
      autoplayInterval={3000} // thời gian chờ giữa các lần chuyển
    />
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    height: 200,
    marginLeft: 15,
    marginRight: 15,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: '100%'
  }
});

export default MyCarousel;
