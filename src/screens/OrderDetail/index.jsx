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
  Modal,
  FormControl,
  Input,
  Pressable,
  TextArea,
  Center,
  Avatar,
  Heading,
  Icon,
  useToast,
} from 'native-base';
import {useMutation, useQuery} from '@tanstack/react-query';
import {orderApi} from '../../apis/order';
import {formatMoney, limitCharacters} from '../../utils';
import {useEffect, useState} from 'react';
import star from '../../assets/icons/star.svg';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {reviewApi} from '../../apis/review';
import * as yup from 'yup';
import {AirbnbRating} from 'react-native-ratings';

const schema = yup.object().shape({
  message: yup.string().required('Vui lòng điền nội dung!'),
});

const OrderDetailPage = ({route}) => {
  const {id, orderData, orderState} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState([]);
  const [formData, setData] = useState({});
  const toast = useToast();
  const [arrayData, setArrayData] = useState({});
  const [message, setMessage] = useState('123');

  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {mutate, data} = useMutation({
    mutationFn: payload => reviewApi.createReview(payload),
    onSuccess: () => {
      console.log('Đã đánh giá');
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
      console.log('error', error);
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              Bạn đã tạo đánh giá cho sản phẩm này
            </Box>
          );
        },
      });
      setShowModal(false);
    },
  });

  const {
    data: detail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['detailOrder'],
    queryFn: () => orderApi.getOrderDetail(id),
  });

  const {data: unRatedData} = useQuery({
    queryKey: ['unratedProduct'],
    queryFn: () =>
      reviewApi.getUnratedProduct({
        orderId: id,
      }),
  });

  useEffect(() => {
    let newArray1 = {};
    if (
      Array.isArray(detail) &&
      Array.isArray(unRatedData) &&
      unRatedData?.length !== 0
    ) {
      newArray1 = detail.map(item1 => {
        const existsInArray2 = unRatedData.some(
          item2 => item2.rateProductDto.id === item1.productId,
        );
        return {
          ...item1,
          rated: existsInArray2 ? 1 : 0,
        };
      });
      setArrayData(newArray1);
    } else {
      setArrayData(detail);
    }
  }, [refetch]);

  const {data: reviewProduct, refetch: reviewProductRefetch} = useQuery({
    queryKey: ['reviewProduct', item.productId], // Thêm item?.id vào queryKey
    queryFn: () => reviewApi.getReviewProduct(item?.productId), // Truyền item?.id vào hàm queryFn
    onSuccess: data => {
      console.log(data);
    },
  });

  if (!id) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner color="blue.500" />
      </Box>
    );
  }

  const handleConfirmOrder = item => {
    setItem(item);
    orderState === '4' ? setShowModal(true) : null;
  };

  const onSubmit = () => {
    mutate({
      orderDetailId: item.id,
      ...formData,
    });
  };

  const renderItem = ({item}) =>
    arrayData ? (
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
          {orderState === '4' && (
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
                {item.rated !== undefined
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

  return (
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
        colorScheme="red"
        _text={{fontWeight: '600', fontSize: 'lg'}}>
        {orderState === '4'
          ? 'Đánh giá'
          : orderState === '3'
          ? 'Mua lại'
          : 'Xác nhận'}
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
                  uri: item?.image,
                }}
                alt="null"
              />
              <Heading size="sm" m={2}>
                {limitCharacters(item.name, 24)}
              </Heading>
              <AirbnbRating
                reviews={['Rất tệ', 'Tệ', 'Khá tốt', 'Tốt', 'Xuất sắc']}
                count={5}
                showRating={false}
                size={15}
                defaultRating={reviewProduct ? reviewProduct[0].star : 3}
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
