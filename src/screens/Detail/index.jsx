import {Image, Dimensions, View, StyleSheet} from 'react-native';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  ChevronRightIcon,
  Container,
  Flex,
  Heading,
  Icon,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Select,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import {productApi} from '../../apis';
import {useQuery} from '@tanstack/react-query';
let {height, width} = Dimensions.get('window');
import {AirbnbRating} from 'react-native-ratings';
import {limitCharacters} from '../../utils';
import Card from '../../container/card';
import {useCart} from '../../hooks';
import {useState} from 'react';
import {LoadingContainer} from '../../components';

export function DetailScreen({route, navigation}) {
  const {id} = route.params;

  const {addItemToCart} = useCart();
  const [color, setColor] = useState();

  const {data: detail, isLoading} = useQuery({
    queryKey: ['detail', id],
    queryFn: () => productApi.getDetail(id),
  });

  const {data: products} = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });

  const {isOpen, onOpen, onClose} = useDisclose();

  const handleAddToCart = async () => {
    await addItemToCart({...detail, variant: color});
  };

  return isLoading ? (
    <LoadingContainer />
  ) : (
    detail && (
      <View backgroundColor="white">
        <ScrollView>
          <Container mx={0}>
            <Image
              source={{
                uri: `${detail.image}`,
              }}
              // width={'100%'}
              style={{width: 400, height: 200}} // You can adjust the width and height as needed
            />
            <Flex direction="column" align="start" mx={3} my={3} w={'115%'}>
              <Heading size="lg">{detail.name}</Heading>
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
                    <Pressable onPress={() => setColor(item)}>
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
              <Flex
                direction="row"
                justify="space-between"
                align={'center'}
                w={'100%'}
                mt={3}>
                <Text bold fontSize={'2xl'} color={'#2f2f2f'}>
                  Có thể bạn thích?
                </Text>
                <Text fontSize={'md'} color={'#2f2f2f'}>
                  12 items
                </Text>
              </Flex>
              <NativeBaseProvider>
                <ScrollView horizontal={true} mt={3}>
                  {products?.map(item => {
                    return (
                      <View style={{marginLeft: 5}} key={item?.id}>
                        <Card data={item} navigation={navigation} />
                      </View>
                    );
                  })}
                </ScrollView>
              </NativeBaseProvider>
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Text
                      fontSize="16"
                      color="gray.500"
                      _dark={{
                        color: 'gray.300',
                      }}>
                      Albums
                    </Text>
                  </Box>
                  <Actionsheet.Item>Delete</Actionsheet.Item>
                  <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
                  <Actionsheet.Item>Play</Actionsheet.Item>
                  <Actionsheet.Item>Favourite</Actionsheet.Item>
                  <Actionsheet.Item>Cancel</Actionsheet.Item>
                </Actionsheet.Content>
              </Actionsheet>
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
            backgroundColor="#db3022">
            Add to Cart
          </Button>
        </View>
      </View>
    )
  );
}
