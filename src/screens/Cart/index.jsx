import {
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  HStack,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import {useCart} from '../../hooks';
import _ from 'lodash';

export function CartScreen({navigation}) {
  const {data, isLoading, removeItemFromCart} = useCart();

  const groupedByData = _.groupBy(data, 'id');
  const totalAmount = Object.values(groupedByData).reduce(
    (acc, cur) => acc + cur[0].price * cur.length,
    0,
  );

  const listProducts = Object.values(groupedByData).map(item => item[0]);

  return isLoading ? (
    <Flex
      justifyContent="center"
      alignItems="center"
      flex={1}
      backgroundColor="white">
      <Spinner size="lg" />
    </Flex>
  ) : (
    <Flex
      direction="column"
      backgroundColor="white"
      pb={12}
      position="relative"
      h="100%"
      width="100%">
      <View>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          paddingX={6}
          paddingY={4}>
          Giỏ hàng của bạn
        </Heading>
        {!data.length && (
          <View px={6}>
            <Divider my={4} />
            <Text>Không có sản phẩm nào trong giỏ hàng</Text>
          </View>
        )}
        <View>
          <FlatList
            data={listProducts}
            paddingX={2}
            renderItem={({item}) => (
              <Pressable
              // onPress={() => navigation.navigate('Detail', {id: item.id})}
              >
                <Box pl={['0', '4']} pr={['0', '5']} my="2" mx={4}>
                  <Button
                    onPress={() => removeItemFromCart(item.id)}
                    position="absolute"
                    top={-8}
                    right={-8}
                    // backgroundColor="#db3022"
                    px={3}
                    py={1}
                    borderRadius="full"
                    zIndex={10}
                    color="white">
                    -
                  </Button>

                  <HStack
                    key={item.id}
                    space={[2, 3]}
                    justifyContent="space-between"
                    bgColor="white"
                    borderRadius={8}
                    py={3}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: -2},
                      shadowOpacity: 0.4,
                      shadowRadius: 4,
                      elevation: 3,
                    }}>
                    <Image
                      size="lg"
                      source={{
                        uri: item.image,
                      }}
                      alt={item.name}
                    />
                    <VStack space={1}>
                      <Heading
                        size="sm"
                        fontWeight="600"
                        color="coolGray.800"
                        _dark={{
                          color: 'warmGray.50',
                        }}>
                        {item.name}
                      </Heading>
                      <Text
                        isTruncated
                        noOfLines={2}
                        fontSize={12}
                        maxWidth="80%">
                        {item.description}
                      </Text>
                      <Text>Màu: {item.variant?.color}</Text>
                      <Text fontWeight="600">
                        {item.variant?.price.toLocaleString('en-US')}đ
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      {data.length > 0 && (
        <View position="absolute" bottom={4} left={0} right={0}>
          <Divider my={4} />
          <View paddingX={6} mt={2}>
            <FlatList
              data={Object.values(groupedByData)}
              renderItem={({item}) => (
                <Box>
                  <HStack
                    space={[2, 3]}
                    justifyContent="space-between"
                    borderRadius={8}
                    pb={2}>
                    <Text fontWeight="600" maxWidth="50%">
                      {item.length}x {item[0].name}
                    </Text>
                    <Text fontWeight="600" maxWidth="50%">
                      {(item[0].price * item.length).toLocaleString('en-US')}đ
                    </Text>
                  </HStack>
                </Box>
              )}
            />
            <Divider my={4} />
            <HStack space={[2, 3]} justifyContent="space-between">
              <Text fontWeight="600" maxWidth="50%">
                Total
              </Text>
              <Text fontWeight="600" maxWidth="50%">
                {totalAmount.toLocaleString('en-US')}đ
              </Text>
            </HStack>
          </View>
          <View px={6} pt={6}>
            <Button
              borderRadius="full"
              onPress={() => navigation.navigate('Payment Method')}>
              Thanh toán
            </Button>
          </View>
        </View>
      )}
    </Flex>
  );
}
