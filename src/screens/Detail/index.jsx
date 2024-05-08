import {Image, View} from 'react-native';
import {
  Box,
  Button,
  ChevronRightIcon,
  Container,
  FlatList,
  Flex,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Text,
  Toast,
  useDisclose,
} from 'native-base';
import {productApi} from '../../apis';
import {useQuery} from '@tanstack/react-query';
import {AirbnbRating} from 'react-native-ratings';
import {limitCharacters} from '../../utils';
import Card from '../../container/card';
import {useCart, useFavorite} from '../../hooks';
import {useEffect, useState} from 'react';
import {LoadingContainer} from '../../components';
import {reviewApi} from '../../apis/review';
import {MaterialIcons} from '@expo/vector-icons';
import {Reviews} from './components';

export function DetailScreen({route, navigation}) {
  const {id} = route.params;

  const {addItemToCart} = useCart();
  const {
    addItemToFavorite,
    removeItemFromFavorite,
    data: favorites,
  } = useFavorite();
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
  const [color, setColor] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [amount, setAmount] = useState(1);

  const {data: detail, isLoading} = useQuery({
    queryKey: ['detail', id],
    queryFn: () => productApi.getDetail(id),
  });

  const {data: products} = useQuery({
    queryKey: ['products', detail?.categoryDto.name],
    queryFn: () =>
      productApi.getProducts({categoryName: detail?.categoryDto.name}),
    enabled: Boolean(detail),
  });

  const {onOpen} = useDisclose();

  const handleAddToCart = async () => {
    setIsLoadingAddToCart(true);
    await addItemToCart({...detail, variant: color, quantity: amount});
    Toast.show({
      title: 'Đã thêm sản phẩm vào giỏ hàng',
      variant: 'success',
    });
    setIsLoadingAddToCart(false);
  };

  const handleDecrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleIncrease = () => {
    setAmount(amount + 1);
  };

  useEffect(() => {
    if (favorites) {
      const isFav = Boolean(favorites.find(item => item.id === id));
      isFav && setIsFavorite(isFav);
    }
  }, [favorites]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      addItemToFavorite(detail);
    } else {
      removeItemFromFavorite(detail.id);
    }
    Toast.show({
      title: isFavorite
        ? 'Đã xoá sản phẩm khỏi mục yêu thích'
        : 'Đã thêm sản phẩm vào mục yêu thích',
    });
  };

  return isLoading ? (
    <LoadingContainer />
  ) : (
    detail && (
      <View backgroundColor="white">
        <ScrollView>
          <Container mx={0} paddingBottom={10}>
            <Image
              source={{
                uri: `${detail.image}`,
              }}
              style={{width: '100%', height: 200}}
            />
            <Flex direction="column" align="start" mx={3} my={3} w={'115%'}>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{gap: 10}}>
                <Heading size="lg" maxW="95%">
                  {detail.name}
                </Heading>
                <Pressable onPress={toggleFavorite}>
                  <Icon
                    as={MaterialIcons}
                    name={isFavorite ? 'favorite' : 'favorite-border'}
                    size="lg"
                    color="red.600"
                  />
                </Pressable>
              </Flex>

              <Heading size="md" fontWeight="bold" color="primary.500">
                {(color?.price || detail.price)?.toLocaleString('en-US')}đ
              </Heading>
              <Text>{detail.categoryDto?.name}</Text>

              <Flex direction="row">
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: 'auto',
                  }}>
                  <AirbnbRating
                    count={5}
                    defaultRating={detail.avgStart || 0}
                    showRating={false}
                    size={15}
                  />
                </View>
                <Text>({detail.avgStart})</Text>
              </Flex>
              <Text style={{textAlign: 'justify'}}>
                ({limitCharacters(detail.description, 150)})
              </Text>

              <Box py={4}>
                <Text mb={2} fontWeight="bold">
                  Chọn màu
                </Text>
                <Flex direction="row" flexWrap="wrap" style={{gap: 8}}>
                  {detail.listProductVariant.map(item => (
                    <Pressable onPress={() => setColor(item)} key={item.id}>
                      <Flex
                        key={item.id}
                        borderWidth={1}
                        borderColor={
                          color?.id === item.id ? 'primary.500' : 'gray.200'
                        }
                        borderRadius="full"
                        paddingX={2}
                        paddingY={1}
                        direction="row"
                        fontSize="sm"
                        style={{gap: 4}}
                        justifyContent="center"
                        alignItems="center">
                        <Image
                          source={{uri: item.image}}
                          width={20}
                          height={20}
                        />
                        {item.color}
                      </Flex>
                    </Pressable>
                  ))}
                </Flex>
              </Box>

              <Box py={4}>
                <Text mb={2} fontWeight="bold">
                  Số lượng
                </Text>
                <Flex direction="row" flexWrap="wrap" style={{gap: 8}}>
                  <Button py={1} px={4} onPress={handleDecrease}>
                    -
                  </Button>
                  <Box
                    borderRadius="md"
                    borderWidth={1}
                    borderColor="gray.500"
                    display="flex"
                    justifyContent="center"
                    px={4}>
                    {amount}
                  </Box>
                  <Button py={1} px={4} onPress={handleIncrease}>
                    +
                  </Button>
                </Flex>
              </Box>
              <Button
                onPress={onOpen}
                mt={3}
                // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
                backgroundColor={'#f9f9f9'}
                // variant="ghost"
              >
                <Flex direction="row" justify="space-between" w={'100%'}>
                  <Text fontSize={'xl'} color={'#2f2f2f'}>
                    Mô tả sản phẩm
                  </Text>
                  <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />
                </Flex>
              </Button>
              <Button
                onPress={onOpen}
                mt={3}
                // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
                backgroundColor={'#f9f9f9'}>
                <Flex direction="row" justify="space-between" w={'100%'}>
                  <Text fontSize={'xl'} color={'#2f2f2f'}>
                    Thông tin vận chuyển
                  </Text>
                  <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />
                </Flex>
              </Button>
              <Button
                onPress={onOpen}
                mt={3}
                // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
                backgroundColor={'#f9f9f9'}>
                <Flex direction="row" justify="space-between" w={'100%'}>
                  <Text fontSize={'xl'} color={'#2f2f2f'}>
                    Hỗ trợ
                  </Text>
                  <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />
                </Flex>
              </Button>
              <Box my={4}>
                <Reviews productId={id} />
              </Box>

              <Flex
                direction="row"
                justify="space-between"
                align={'center'}
                w={'100%'}
                mt={3}>
                <Text bold fontSize={'2xl'} color={'#2f2f2f'}>
                  Có thể bạn thích?
                </Text>
              </Flex>
              <View>
                <ScrollView horizontal={true} mt={3}>
                  {products?.map(item => (
                    <View style={{marginLeft: 5}} key={item?.id}>
                      <Card data={item} navigation={navigation} />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Flex>
          </Container>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
            backgroundColor: '#fff',
          }}>
          <Button
            onPress={handleAddToCart}
            size="lg"
            variant="solid"
            width="90%"
            borderRadius="full"
            isDisabled={!color}
            isLoading={isLoadingAddToCart}
            backgroundColor="#db3022">
            Add to Cart
          </Button>
        </View>
      </View>
    )
  );
}
