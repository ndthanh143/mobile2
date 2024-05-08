import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Link,
  Modal,
  Toast,
  VStack,
} from 'native-base';
import {Text} from 'react-native';
import {object, string} from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import {authApi} from '../../apis';

const schema = object({
  email: string().required().email(),
});

export function ForgotPasswordScreen({navigation}) {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [idHash, setIdHash] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'thanhnduy143@gmail.com',
    },
  });

  const {mutate: mutateRequest, isPending: isPendingRequest} = useMutation({
    mutationFn: payload => authApi.requestForgotPassword(payload),
    onSuccess: data => {
      setIdHash(data.data.idHash);
      setShowOTPModal(true);
    },
    onError: () => {},
  });

  const {mutate: mutateOtp, isPending: isPendingConfirmOtp} = useMutation({
    mutationFn: payload => authApi.confirmOtpForgetPassword(payload),
    onSuccess: () => {
      Toast.show({
        title: 'Đặt lại mật khẩu mới thành công',
        variant: 'success',
      });
      navigation.navigate('Sign In');
    },
    onError: () => {},
  });

  const onSubmit = async data => {
    mutateRequest(data);
  };

  const handleSubmitOtp = () => {
    mutateOtp({otp, newPassword, idHash});
  };

  return (
    <Center w="100%" height="100%" bgColor="white">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Quên mật khẩu
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={errors.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text color="red" fontSize="xs">
                {errors.email.message}
              </Text>
            )}
          </FormControl>
          <Button
            mt="2"
            colorScheme="red"
            borderRadius="3xl"
            isLoading={isPendingRequest}
            onPress={handleSubmit(onSubmit)}>
            Gửi yêu cầu
          </Button>
          <Link
            alignSelf="center"
            mt="4"
            _text={{
              fontSize: 'sm',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            onPress={() => navigation.navigate('Sign In')}>
            Quay lại đăng nhập
          </Link>
        </VStack>
      </Box>

      <Modal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        size={'md'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Xác thực OTP</Modal.Header>
          <Modal.Body display="flex" flexDirection="column" style={{gap: 12}}>
            <Input
              placeholder="OTP"
              value={otp}
              onChangeText={e => setOtp(e)}
            />
            <Input
              placeholder="Mật khẩu mới"
              type="password"
              value={newPassword}
              onChangeText={e => setNewPassword(e)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="red"
                mr={3}
                onPress={handleSubmitOtp}
                isLoading={isPendingConfirmOtp}>
                Xác nhận
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
