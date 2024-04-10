import {
  Box,
  Button,
  CheckIcon,
  Container,
  Heading,
  Text,
  View,
} from 'native-base';
import {useEffect} from 'react';
import {useCart} from '../../hooks';
import {useQuery} from '@tanstack/react-query';
import {orderApi} from '../../apis';
import {LoadingContainer} from '../../components';

export function OrderSuccessScreen({route, navigation}) {
  const {orderId, method} = route.params;

  console.log('method', method === 'COD');

  const {isLoading, data} = useQuery({
    queryKey: ['my-order'],
    queryFn: () => orderApi.getMyOrder(),
  });

  const {saveCart} = useCart();

  const handleViewOrder = () => {
    console.log('orderId', orderId);
    const orderData = data?.find(item => item.id === orderId);
    if (orderData) {
      navigation.navigate('Order Detail', {
        id: orderId,
        orderData,
      });
    } else {
      navigation.navigate('My Order');
    }
  };

  useEffect(() => {
    saveCart([]);
  }, []);

  return isLoading ? (
    <LoadingContainer />
  ) : (
    <View width="full" height="full" bgColor="white" style={{gap: 30}}>
      <Container
        mx="auto"
        display="flex"
        width="100%"
        height="full"
        alignItems="center"
        justifyContent="center"
        style={{gap: 40}}>
        {method === 'COD' ? (
          <Heading mx="auto">Đặt hàng thành công</Heading>
        ) : (
          <Heading mx="auto">Thanh toán thành công</Heading>
        )}
        <Box
          borderRadius="full"
          borderWidth={4}
          borderColor="green.500"
          width={100}
          height={100}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <CheckIcon color="green.500" size="4xl" />
        </Box>
        <Button borderRadius="full" width="100%" onPress={handleViewOrder}>
          Xem đơn hàng
        </Button>
      </Container>
    </View>
  );
}
