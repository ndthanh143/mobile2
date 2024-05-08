import {useQuery} from '@tanstack/react-query';
import {Box, Button, Flex, Heading, Text, View} from 'native-base';
import {orderApi} from '../../apis';
import {useEffect, useState} from 'react';
import {AdminLayout, LoadingOverlay} from '../../components';
import {useNavigation} from '@react-navigation/core';
import {Pressable} from 'react-native';

const orderColorStatus = {
  1: {bg: 'blue.500', text: '#fff'},
  2: {bg: 'yellow.500', text: '#000'},
  3: {bg: 'green.500', text: '#fff'},
  4: {bg: 'red.500', text: '#fff'},
};
const OrderCard = ({order}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Admin Order Detail', {order})}>
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
    </Pressable>
  );
};

const PAGE_SIZE = 10;
export function AdminOrdersManagement() {
  const [page, setPage] = useState();
  const [selectedStatus, setSelectedStatus] = useState(1); // State to manage the selected status filter

  const {data, refetch, isFetched, isFetching} = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () =>
      orderApi.getListOrder({page, size: PAGE_SIZE, state: selectedStatus}),
  });

  const handleStatusChange = status => {
    setSelectedStatus(status);
    refetch(); // Refetch the orders based on the new status
  };

  useEffect(() => {
    if (selectedStatus && isFetched) {
      refetch();
    }
  }, [selectedStatus]);

  return (
    <>
      <AdminLayout>
        <Box height="100%" p={4}>
          <Heading textAlign="center" mb={4}>
            Orders Management
          </Heading>
          <Flex flexWrap="wrap" direction="row" mb={6}>
            {Object.entries(orderColorStatus).map(([key, value]) => (
              <Box width="1/2" key={key}>
                <Button
                  mx={2}
                  my={2}
                  px={-2}
                  bgColor={selectedStatus == key ? value.bg : 'transparent'}
                  borderColor={value.bg}
                  variant={'outline'}
                  onPress={() => handleStatusChange(key)}>
                  <Text color={selectedStatus == key ? value.text : 'gray.800'}>
                    {key == 1
                      ? 'Đang xử lý'
                      : key == 2
                      ? 'Duyệt'
                      : key == 3
                      ? 'Hoàn thành'
                      : 'Đã hủy'}
                  </Text>
                </Button>
              </Box>
            ))}
          </Flex>

          {data?.content.map(item => (
            <Box mb={4} key={item.id}>
              <OrderCard order={item} />
            </Box>
          ))}
        </Box>
      </AdminLayout>
      <LoadingOverlay loading={isFetching} />
    </>
  );
}
