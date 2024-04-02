import {Box, Button, Heading, Radio, Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export function PaymentMethodScreen({navigation}) {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const navigateToPaymentScreen = () =>
    navigation.navigate('Payment', {method: selectedMethod});

  return (
    <View style={styles.container} mx={6}>
      <Heading size="lg">Choose Payment Method</Heading>
      <Radio.Group
        name="paymentMethod"
        accessibilityLabel="Choose payment method"
        onChange={setSelectedMethod}
        value={selectedMethod}>
        <Radio value="COD" my={1}>
          Ship COD
        </Radio>
        <Radio value="PayPal" my={1}>
          PayPal
        </Radio>
      </Radio.Group>
      <Button
        borderRadius="full"
        width="full"
        onPress={navigateToPaymentScreen}>
        Xác nhận
      </Button>
    </View>
  );
}
