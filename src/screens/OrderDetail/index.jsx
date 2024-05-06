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
  Modal,
  FormControl,
  Pressable,
  TextArea,
  Center,
  Heading,
  Icon,
  useToast,
} from 'native-base';
import {useMutation, useQuery} from '@tanstack/react-query';
import {orderApi} from '../../apis/order';
import {formatMoney, limitCharacters} from '../../utils';
import {useEffect, useState} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {reviewApi} from '../../apis/review';
import {AirbnbRating} from 'react-native-ratings';
import {LoadingContainer} from '../../components';

const OrderDetailPage = ({route}) => {
  const {id, orderData} = route.params;

  const orderState = orderData.state;
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setProductSelected] = useState([]);
  const [formData, setData] = useState({});
  const toast = useToast();
  const [arrayData, setArrayData] = useState([]);

  const {mutate: mutateCreateReview} = useMutation({
    mutationFn: payload => reviewApi.createReview(payload),
    onSuccess: () => {
      setShowModal(false);
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Bạn đã đánh giá thành công
            </Box>
          );
        },
      });
    },
    onError: error => {
      console.log(error);
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              Đánh giá không thành công, vui lòng thử lại
            </Box>
          );
        },
      });
      setShowModal(false);
    },
  });

  const {
    data: detail,
    isFetching,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ['detailOrder', id],
    queryFn: () => orderApi.getOrderProducts(id),
  });

  const {data: unRatedData, refetch: refetchRatedProduct} = useQuery({
    queryKey: ['unratedProduct', id],
    queryFn: () =>
      reviewApi.getUnratedProduct({
        orderId: id,
      }),
  });

  useEffect(() => {
    if (id && isFetched) {
      refetch();
      refetchRatedProduct();
    }
  }, [id]);

  useEffect(() => {
    let newArray1 = [];
    if (
      Array.isArray(detail) &&
      Array.isArray(unRatedData) &&
      unRatedData?.length !== 0
    ) {
      newArray1 = detail.map(item1 => {
        const existsInArray2 = unRatedData.find(
          item2 => item2.rateProductDto.id === item1.productId,
        );
        return {
          ...item1,
          rated: Boolean(existsInArray2),
        };
      });
      setArrayData(newArray1);
    } else {
      setArrayData(detail);
    }
  }, [isFetching]);

  const {data: reviewProduct} = useQuery({
    queryKey: ['reviewProduct', selectedProduct.productId], // Thêm item?.id vào queryKey
    queryFn: () => reviewApi.getReviewProduct(selectedProduct?.productId), // Truyền item?.id vào hàm queryFn
  });

  if (!id) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner color="blue.500" />
      </Box>
    );
  }

  const handleConfirmOrder = item => {
    setProductSelected(item);
    Number(orderState) === 4 ? setShowModal(true) : null;
  };

  const onSubmit = () => {
    mutateCreateReview({
      orderDetailId: selectedProduct.id,
      ...formData,
    });
  };

  const renderItem = ({item}) =>
    arrayData.length > 0 ? (
      <Pressable onPress={() => handleConfirmOrder(item)}>
        <Box
          borderWidth="1.5"
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
          {Number(orderState) === 4 && (
            <HStack
              bg="blue.500"
              position="absolute"
              right="0"
              bottom="0"
              p={0.5}>
              {/* <HStack bg={'blue.500'} p={1}> */}
              <Icon
                as={<MaterialCommunityIcons name={'star'} />}
                color={'white'}
                m={0.5}
              />
              <Text color={'white'} style={{fontWeight: '600'}} mr={1}>
                {item.rated
                  ? item.rated === 1
                    ? 'Đã đánh giá'
                    : 'Cần đánh giá'
                  : 'Đã đánh giá'}
              </Text>
              {/* </HStack> */}
            </HStack>
          )}
        </Box>
      </Pressable>
    ) : (
      <Spinner />
    );

  return isFetching ? (
    <LoadingContainer />
  ) : (
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
        data={arrayData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        mb={'10px'}
      />
      <Button
        mx={'8px'}
        borderRadius="full"
        colorScheme="red"
        _text={{fontWeight: '600', fontSize: 'lg'}}>
        {orderState === 4 ? 'Đánh giá' : 'Huỷ đơn hàng'}
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Đánh giá</Modal.Header>
          <Modal.Body>
            <Center>
              <Image
                size="lg"
                borderRadius={'sm'}
                source={{
                  uri: selectedProduct?.image,
                }}
                alt="null"
              />
              <Heading size="sm" m={2}>
                {limitCharacters(selectedProduct.name, 24)}
              </Heading>
              <AirbnbRating
                reviews={['Rất tệ', 'Tệ', 'Khá tốt', 'Tốt', 'Xuất sắc']}
                count={5}
                showRating={false}
                size={15}
                defaultRating={reviewProduct && reviewProduct[0].star}
                isDisabled={reviewProduct ? true : false}
                onChangeText={value => setData({...formData, star: value})}
              />
            </Center>
            <FormControl isRequired>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                Nội dung
              </FormControl.Label>
              {reviewProduct ? (
                <TextArea
                  // placeholder="Điền nội dung"
                  // onChangeText={value => setData({...formData, message: value})}
                  isDisabled
                  value={reviewProduct[0]?.message}
                />
              ) : (
                <TextArea
                  placeholder="Điền nội dung..."
                  onChangeText={value => setData({...formData, message: value})}
                />
              )}
              <FormControl.ErrorMessage
                _text={{
                  fontSize: 'xs',
                }}>
                Không được để trống
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl mt="3"></FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Đóng
              </Button>
              {!reviewProduct && (
                <Button colorScheme="red" onPress={() => onSubmit()}>
                  Xác nhận
                </Button>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default OrderDetailPage;
