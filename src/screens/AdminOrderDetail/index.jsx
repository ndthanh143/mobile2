import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Modal,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {orderApi} from '../../apis';
import {useState} from 'react';
import {LoadingOverlay} from '../../components';

const orderColorStatus = {
  1: {bg: 'blue.500', text: '#fff'},
  2: {bg: 'yellow.500', text: '#000'},
  3: {bg: 'green.500', text: '#fff'},
  4: {bg: 'red.500', text: '#fff'},
};
const OrderCard = ({order}) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderColor={'gray.300'}
      borderRadius={8}
      position="relative">
      <Text fontSize={12}>#{order.id}</Text>
      <Text fontSize={14}>
        Mã Đơn hàng: <Text fontWeight={600}>{order.orderCode}</Text>
      </Text>

      <Text fontSize={14}>
        Ngày tạo: <Text fontWeight={600}>{order.createdDate}</Text>
      </Text>
      <Text fontSize={14}>
        Người nhận: <Text fontWeight={600}>{order.receiver}</Text>
      </Text>
      <Text fontSize={14}>
        Tổng tiền:{' '}
        <Text fontWeight={600}>
          {order.totalMoney.toLocaleString('en-US')} (VND)
        </Text>
      </Text>
      <Text fontSize={14}>
        Địa chỉ giao hàng:{' '}
        <Text fontWeight={600}>
          {order.ward}, {order.district}, {order.province}
        </Text>
      </Text>
      <Text fontSize={14}>
        Ghi chú: <Text fontWeight={600}>{order.note || '--'}</Text>
      </Text>
      <Text fontSize={14}>
        Trạng thái thanh toán:{' '}
        <Text fontWeight={600} color={order.isPaid ? 'green.500' : 'red.500'}>
          {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Text>
      </Text>
      <Box
        bgColor={orderColorStatus[order.state].bg}
        position="absolute"
        top={0}
        right={0}
        p={2}>
        <Text color={orderColorStatus[order.state].text}>
          {order.state === 1
            ? 'Đang xử lý'
            : order.state === 2
            ? 'Duyệt'
            : order.state === 3
            ? 'Hoàn thành'
            : 'Đã hủy'}
        </Text>
      </Box>
    </Box>
  );
};

export function AdminOrderDetail({route}) {
  const {order: data} = route.params;
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const {data: products} = useQuery({
    queryKey: ['order-products'],
    queryFn: () => orderApi.getOrderProducts(data.id),
  });

  const {
    data: orderDetail,
    refetch: refetchOrder,
    isFetched: isFetchedOrder,
    isLoading: isLoadingOrder,
    isFetching: isFetchingOrder,
  } = useQuery({
    queryKey: ['order-details'],
    queryFn: () => orderApi.getOrder(data.id),
  });

  const {mutate: mutateUpdateOrder, isPending: isPendingUpdate} = useMutation({
    mutationFn: orderApi.updateOrder,
    onSuccess: () => {
      refetchOrder();
      setShowModal(false);
      setShowPaymentModal(false);
      queryClient.invalidateQueries('admin-orders');
    },
  });

  const onUpdate = state => {
    mutateUpdateOrder({
      id: orderDetail.id,
      state: Number(state),
      isPaid: orderDetail.isPaid,
      ...(Number(state) === 3 && {
        isPaid: true,
      }),
    });
  };

  const onUpdatePayment = () => {
    mutateUpdateOrder({
      id: orderDetail.id,
      state: orderDetail.state,
      isPaid: !orderDetail.isPaid,
    });
  };

  if (isFetchedOrder && !orderDetail) {
    return <Text>Không tìm thấy đơn hàng</Text>;
  }

  if (isLoadingOrder) {
    return (
      <Center height="100%" bgColor="white">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    orderDetail && (
      <>
        <ScrollView bg="white" p={4} height="100%">
          <Heading fontSize={20} mb={4}>
            Chi tiết đơn hàng
          </Heading>
          <Button
            mb={3}
            bgColor={
              [3, 4].includes(orderDetail.state) ? 'gray.300' : 'primary.500'
            }
            disabled={[3, 4].includes(orderDetail.state)}
            onPress={() => setShowModal(true)}>
            Cập nhật trạng thái đơn hàng
          </Button>
          <Button
            mb={3}
            bgColor={
              [3, 4].includes(orderDetail.state) ? 'gray.300' : 'yellow.500'
            }
            disabled={[3, 4].includes(orderDetail.state)}
            onPress={() => setShowPaymentModal(true)}>
            Cập nhật trạng thái thanh toán
          </Button>
          <OrderCard order={orderDetail} />
          <Heading fontSize={20} mt={4} mb={4}>
            Danh sách sản phẩm
          </Heading>
          <Stack style={{gap: 8}} mb={10}>
            {products?.map(item => (
              <Box
                key={item.id}
                p={4}
                borderWidth={1}
                borderColor={'gray.300'}
                borderRadius={8}
                position="relative">
                <Image
                  source={{uri: item.image}}
                  alt={item.name}
                  width="100%"
                  height={200}
                  mb={2}
                />
                <Text fontSize={14}>
                  Tên sản phẩm: <Text fontWeight={600}>{item.name}</Text>
                </Text>
                <Text fontSize={14}>
                  Giá:{' '}
                  <Text fontWeight={600}>
                    {item.price.toLocaleString('en-US')}
                  </Text>
                </Text>
                <Text fontSize={14}>
                  Màu sắc: <Text fontWeight={600}>{item.color}</Text>
                </Text>
              </Box>
            ))}
          </Stack>

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Update Order Status</Modal.Header>
              <Modal.Body>
                <Select
                  selectedValue={String(orderDetail.state)}
                  onValueChange={nextValue => onUpdate(nextValue)}>
                  <Select.Item label="Đang xử lý" value="1" />
                  <Select.Item label="Duyệt" value="2" />
                  <Select.Item label="Hoàn thành" value="3" />
                  <Select.Item label="Đã hủy" value="4" />
                </Select>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <Modal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Update Payment Status</Modal.Header>
              <Modal.Body>
                <Button
                  colorScheme={orderDetail.isPaid ? 'red' : 'green'}
                  onPress={() =>
                    onUpdatePayment(orderDetail.id, !orderDetail.isPaid)
                  }>
                  {orderDetail.isPaid ? 'Set as Unpaid' : 'Set as Paid'}
                </Button>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </ScrollView>
        <LoadingOverlay loading={isPendingUpdate || isFetchingOrder} />
      </>
    )
  );
}
