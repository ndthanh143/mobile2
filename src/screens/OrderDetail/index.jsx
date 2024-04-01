import {ScrollView} from 'react-native';
import {
  Box,
  Text,
  Button,
  Spinner,
  Card,
  HStack,
  VStack,
  FlatList,
  Image,
} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {orderApi} from '../../apis/order';
import {formatMoney, limitCharacters} from '../../utils';

const OrderDetailPage = ({route}) => {
  const {id, orderData, orderState} = route.params;

  const {
    data: detail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['detailOrder'],
    queryFn: () => orderApi.getOrderDetail(id),
  });

  if (!id) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner color="blue.500" />
      </Box>
    );
  }

  const renderItem = ({item}) => (
    <Box
      borderWidth="1"
      _dark={{
        borderColor: 'muted.50',
      }}
      borderColor="blue.500"
      p="2"
      m={'8px'}
      borderRadius={'sm'}>
      <HStack space={[2, 3]} justifyContent="start" alignItems={'center'}>
        <Image
          size="lg"
          borderRadius={'sm'}
          source={{
            uri: item.image,
          }}
          alt="null"
        />
        <VStack>
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            bold>
            {limitCharacters(item.name, 24)}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            {'Màu: '}
            {item.color}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            {'Số lượng: '}
            {item.amount}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );

  console.log(orderData);

  return (
    <ScrollView>
      <Box p={2}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={2}
          w={'100%'}
          textAlign={'center'}>
          Thông tin đơn hàng
        </Text>
        <Card borderRadius={8} p={4}>
          <VStack space={2} mb={2}>
            <HStack>
              <Text fontSize="lg" fontWeight={'600'}>
                Mã vận đơn:{' '}
              </Text>
              <Text fontSize="lg">{orderData?.orderCode}</Text>
            </HStack>
            <HStack>
              <Text fontSize="lg" fontWeight={'600'}>
                Người nhận:{' '}
              </Text>
              <Text fontSize="lg">{orderData?.receiver}</Text>
            </HStack>
            <HStack>
              <Text fontSize="lg" fontWeight={'600'}>
                Địa chỉ:{' '}
              </Text>
              <Text fontSize="lg">{orderData?.address}</Text>
            </HStack>
            <HStack>
              <Text fontSize="lg" fontWeight={'600'}>
                Tổng tiền:{' '}
              </Text>
              <Text fontSize="lg">
                {formatMoney(orderData?.totalMoney, {
                  groupSeparator: ',',
                  decimalSeparator: '.',
                  currentcy: 'đ',
                  currentcyPosition: 'BACK',
                  currentDecimal: '0',
                })}
              </Text>
            </HStack>
          </VStack>
        </Card>
        <FlatList
          data={detail}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          mb={'10px'}
        />
        <Button
          mx={'8px'}
          colorScheme="red"
          onPress={() => handleConfirmOrder(detail?.id)}
          _text={{fontWeight: '600', fontSize: 'lg'}}>
          {orderState === '4'
            ? 'Đánh giá'
            : orderState === '3'
            ? 'Mua lại'
            : 'Xác nhận'}
        </Button>
      </Box>
    </ScrollView>
  );
};

export default OrderDetailPage;
