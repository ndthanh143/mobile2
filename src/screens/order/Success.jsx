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
import {useFavorite} from '../../hooks';

export function OrderSuccessScreen({route, navigation}) {
  const {orderId, method} = route.params;

  console.log('method', method === 'COD');

  const {saveCart} = useFavorite();

  const handleViewOrder = () => {
    navigation.navigate('Order Detail', {id: orderId});
  };

  useEffect(() => {
    saveCart([]);
  }, []);

  return (
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
