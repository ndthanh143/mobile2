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
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import {useCart} from '../../hooks';
import _ from 'lodash';

export function CartScreen({navigation}) {
  const {data, isLoading, removeItemFromCart} = useCart();

  const totalAmount = Object.values(data).reduce(
    (acc, cur) => acc + cur?.variant.price * cur.quantity,
    0,
  );

  return isLoading ? (
    <Flex
      justifyContent="center"
      alignItems="center"
      flex={1}
      backgroundColor="white">
      <Spinner size="lg" />
    </Flex>
  ) : (
    <ScrollView h="100%" bgColor="white">
      <Flex
        direction="column"
        pb={12}
        position="relative"
        justifyContent="space-between"
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
            {data.map(item => (
              <Box pl={['0', '4']} pr={['0', '5']} my="2" mx={4} key={item.id}>
                <Button
                  onPress={() => removeItemFromCart(item?.id)}
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
                  key={item?.id}
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
                      uri: item?.image,
                    }}
                    alt={item?.name}
                  />
                  <VStack space={1}>
                    <Heading
                      size="sm"
                      fontWeight="600"
                      color="coolGray.800"
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      maxW="80%">
                      {item?.name}
                    </Heading>
                    <Text
                      isTruncated
                      noOfLines={2}
                      fontSize={12}
                      maxWidth="80%">
                      {item?.description}
                    </Text>
                    <Text>Màu: {item?.variant?.color}</Text>
                    <Text fontWeight="600">
                      {item?.variant?.price.toLocaleString('en-US')}đ
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </View>
        </View>
        {data.length > 0 && (
          <View>
            <Divider my={4} />
            <View paddingX={6} mt={2}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <Box>
                    <HStack
                      space={[2, 3]}
                      justifyContent="space-between"
                      borderRadius={8}
                      pb={2}>
                      <Text fontWeight="600" maxWidth="50%">
                        {item.quantity}x {item.name}
                      </Text>
                      <Text fontWeight="600" maxWidth="50%">
                        {(item.variant.price * item.quantity).toLocaleString(
                          'en-US',
                        )}
                        đ
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
    </ScrollView>
  );
}
