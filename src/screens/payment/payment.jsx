import {useMutation, useQuery} from '@tanstack/react-query';
import {
  Box,
  Button,
  CheckIcon,
  Heading,
  Pressable,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from 'native-base';
import {addressApi, orderApi} from '../../apis';
import {useAuth, useCart} from '../../hooks';
import _ from 'lodash';
import {useState} from 'react';
import {transaction} from '../../apis/transaction';
import {WebView} from 'react-native-webview';

export function PaymentScreen({route, navigation}) {
  const {method} = route.params;
  const {profile} = useAuth();

  const {data} = useCart();
  const [sandbox, setSanbox] = useState();

  // console.log('profile', profile);

  // console.log('method', method);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [order, setOrder] = useState();

  const {data: addresses} = useQuery({
    queryKey: ['my-address'],
    queryFn: () => addressApi.getAddressByUser(),
  });
  const groupedByData = _.groupBy(data, 'id');

  const listOrderProduct = Object.values(groupedByData).map(item => ({
    color: item[0].listProductVariant[0].color,
    price: item[0].price,
    productName: item[0].name,
    productVariantId: item[0].listProductVariant[0].id,
    quantity: item.length,
  }));

  const {mutate: mutateTransaction} = useMutation({
    mutationFn: transaction.createTransaction,
    onSuccess: sanboxUrl => {
      setSanbox(sanboxUrl);
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const {mutate, isPending} = useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: data => {
      setOrder(data);
      mutateTransaction({
        orderId: data.orderId,
        urlCancel: 'exp://192.168.1.244:8081',
        urlSuccess: 'exp://192.168.1.244:8081',
      });
      setSanbox(null);
      console.log('Order created');
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const methodValues = {
    COD: 0,
    PayPal: 1,
  };

  const handleSubmit = () => {
    const payload = profile && {
      receiver: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      paymentMethod: methodValues[method],
      listOrderProduct,
      addressId: selectedAddressId,
    };

    mutate(payload);
  };

  const handleNavigateStateChange = state => {
    if (state.url.includes('cancel')) {
      setSanbox(null);
    }
    if (state.url.includes('success')) {
      navigation.navigate('Order Success', {orderId: order?.id});
    }
  };

  return (
    <View style={{flex: 1}}>
      {sandbox ? (
        <WebView
          source={{uri: sandbox}}
          style={{height: '100%', width: '100%'}}
          onNavigationStateChange={handleNavigateStateChange}
        />
      ) : (
        <>
          <VStack flex={1} px="4" py="2" space="4" bg="coolGray.50">
            <Heading size="lg" color="coolGray.800" px="4" pt="4">
              Select your Address
            </Heading>
            <ScrollView>
              {addresses?.content?.map(address => (
                <Pressable
                  key={address.id}
                  onPress={() => setSelectedAddressId(address.id)}
                  bg={
                    selectedAddressId === address.id ? 'primary.100' : 'white'
                  }
                  borderRadius="md"
                  shadow={3}
                  p="5"
                  m="2">
                  <Box>
                    <Text fontSize="md" bold color="coolGray.800">
                      {address.name}
                    </Text>
                    <Text color="coolGray.600">
                      {address.address}, {address.wardInfo.name}
                    </Text>
                    <Text color="coolGray.600">
                      {address.districtInfo.name}, {address.provinceInfo.name}
                    </Text>
                    <Text color="coolGray.600">Phone: {address.phone}</Text>
                  </Box>
                </Pressable>
              ))}
            </ScrollView>
            <Button
              mx="4"
              mb="4"
              colorScheme="primary"
              borderRadius="full"
              onPress={handleSubmit}
              isDisabled={!selectedAddressId}
              isLoading={isPending}>
              Submit
            </Button>
          </VStack>
        </>
      )}
    </View>
  );
}
