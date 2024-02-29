import React, {useState} from 'react';
import {
  Box,
  FormControl,
  Input,
  Button,
  Center,
  Heading,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ScrollView,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import {userApi} from '../../apis';

const schema = yup.object().shape({
  fullName: yup.string().required('Họ và tên không được bỏ trống'),
  birthday: yup.string().required('Ngày sinh không được bỏ trống'),
  phone: yup.string().required('Số điện thoại không được bỏ trống'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống'),
  password: yup.string().required('Mật khẩu không được bỏ trống'),
});

export function SignUpScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');

  const {mutate, data: registerData} = useMutation({
    mutationFn: payload => userApi.signUp(payload),
    onSuccess: () => {
      setShowOTPModal(true);
    },
    onError: () => {},
  });

  console.log(registerData);
  const {mutate: mutateOtp} = useMutation({
    mutationFn: payload => userApi.confirmOtp(payload),
    onSuccess: () => {
      navigation.navigate('Home');
    },
  });

  const onSubmit = data => {
    const {birthday, ...rest} = data;

    mutate({...rest});
  };

  const handleSubmitOtp = () => {
    mutateOtp({
      otp,
      idHash: 'eJwBIADf//QWKgvmxZIzqti9ezDJOA2zAFa0es3cGrifp4JlymnBBYoQew==',
    });
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold">
          Chào mừng
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs">
          Đăng ký để tiếp tục!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={errors.fullName}>
            <FormControl.Label>Họ và tên</FormControl.Label>
            <Controller
              control={control}
              render={({field}) => <Input {...field} />}
              name="fullName"
            />
            <Text color="red" fontSize="xs">
              {errors.fullName?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.birthday}>
            <FormControl.Label>Ngày sinh</FormControl.Label>
            <Controller
              control={control}
              render={({field}) => <Input {...field} />}
              name="birthday"
            />
            <Text color="red" fontSize="xs">
              {errors.birthday?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.phone}>
            <FormControl.Label>Số điện thoại</FormControl.Label>
            <Controller
              control={control}
              render={({field}) => <Input {...field} />}
              name="phone"
            />
            <Text color="red" fontSize="xs">
              {errors.phone?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              render={({field}) => <Input {...field} />}
              name="email"
            />
            <Text color="red" fontSize="xs">
              {errors.email?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Controller
              control={control}
              render={({field}) => <Input {...field} secureTextEntry />}
              name="password"
            />
            <Text color="red" fontSize="xs">
              {errors.password?.message}
            </Text>
          </FormControl>
          <Button
            mt="2"
            mb="10"
            colorScheme="red"
            borderRadius="3xl"
            onPress={handleSubmit(onSubmit)}>
            Đăng ký
          </Button>
        </VStack>

        <Modal
          isOpen={showOTPModal}
          onClose={() => setShowOTPModal(false)}
          size={'md'}>
          <Modal.Content maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Xác thực OTP</Modal.Header>
            <Modal.Body>
              <Input
                placeholder="OTP"
                value={otp}
                onChangeText={e => setOtp(e)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button colorScheme="red" mr={3} onPress={handleSubmitOtp}>
                  Submit
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </Center>
  );
}
