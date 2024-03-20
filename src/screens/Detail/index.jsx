import {Image, Dimensions, View} from 'react-native';
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

export function DetailScreen({route, navigation}) {
  const {id} = route.params;

  const {
    data: detail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['detail'],
    queryFn: () => productApi.getDetail(id),
  });

  const {data: products} = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });

  const {isOpen, onOpen, onClose} = useDisclose();

  console.log(id);

  return (
    <View>
      <ScrollView>
        <Container mx={0}>
          <Image
            source={{
              uri: `${detail?.image}`,
            }}
            // width={'100%'}
            style={{width: 400, height: 200}} // You can adjust the width and height as needed
          />
          <Flex direction="column" align="start" mx={3} my={3} w={'115%'}>
            <Heading size="lg">{detail?.name}</Heading>
            <Text>{detail?.categoryDto?.name}</Text>
            <Flex direction="row">
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: 'auto',
                }}>
                <AirbnbRating
                  count={5} // số lượng sao
                  // reviews={['Tệ', 'Kém', 'Bình thường', 'Tốt', 'Xuất sắc']}
                  defaultRating={
                    detail?.avgStart !== 0 ? detail?.avgStart !== 0 : 3
                  } // đánh giá mặc định
                  // isDisabled={true}
                  showRating={false}
                  size={15} // kích thước của sa
                  // onFinishRating={rating => console.log(`Đánh giá: ${rating}`)}
                />
              </View>
              <Text>({detail?.avgStart})</Text>
            </Flex>
            <Text style={{textAlign: 'justify'}}>
              ({limitCharacters(detail?.description, 150)})
            </Text>
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
            <Flex
              align="center"
              justify="center"
              style={{backgroundColor: '#ffffff'}}
              w={'100%'}
              h={'100px'}>
              <Button w={'90%'} style={{backgroundColor: '#db3022'}}>
                Thêm vào giỏ hàng
              </Button>
            </Flex>
          </Flex>
        </Container>
      </ScrollView>
    </View>
  );
}
