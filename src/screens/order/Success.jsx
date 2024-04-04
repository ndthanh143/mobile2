import {
  Box,
  Button,
  CheckIcon,
  Container,
  Heading,
  Text,
  View,
} from 'native-base';

export function OrderSuccessScreen({route, navigation}) {
  const {orderId} = route.params;

  const handleViewOrder = () => {
    navigation.navigate('Order Detail', {id: orderId});
  };

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
        <Heading mx="auto">Thanh toán thành công</Heading>
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
