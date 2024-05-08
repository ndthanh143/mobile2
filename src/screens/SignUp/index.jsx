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
  Flex,
  Toast,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import {userApi} from '../../apis';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import moment from 'moment';

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
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: 'Nguyễn Đức Thanh',
      birthday: '1999-03-15',
      phone: '0987654321',
      password: 'thanh123',
      email: 'nguyenduythanh.spkt@gmail.com',
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide the DatePicker
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');

  const {
    mutate: mutateSignUp,
    isPending: isPendingSignUp,
    data: registerData,
  } = useMutation({
    mutationFn: payload => userApi.signUp(payload),
    onSuccess: payload => {
      console.log('payload', payload);
      setShowOTPModal(true);
      reset();
    },
    onError: () => {
      Toast.show({
        title: 'Đăng ký thất bại vui lòng thử lại sau',
        status: 'error',
      });
    },
  });

  const {mutate: mutateOtp} = useMutation({
    mutationFn: payload => userApi.confirmOtp(payload),
    onSuccess: () => {
      navigation.navigate('Home');
    },
  });

  const handleSubmitOtp = () => {
    mutateOtp({
      otp,
      idHash: 'eJwBIADf//QWKgvmxZIzqti9ezDJOA2zAFa0es3cGrifp4JlymnBBYoQew==',
    });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(watch('birthday'));
    setShowDatePicker(false);

    const birthdayValue = moment(currentDate).format('DD/MM/yyyy');
    setValue('birthday', birthdayValue); // Update React Hook Form
  };

  return (
    <Center w="100%" height="100%" bgColor="white">
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
              render={({field: {onChange, onBlur, value}}) => (
                <Input onChangeText={onChange} onBlur={onBlur} value={value} />
              )}
              name="fullName"
            />
            <Text color="red.500" fontSize="xs">
              {errors.fullName?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.birthday}>
            <FormControl.Label>Ngày sinh</FormControl.Label>
            <Flex direction="row" style={{gap: 10}}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    readOnly
                    flex={1}
                  />
                )}
                name="birthday"
              />
              <Button onPress={() => setShowDatePicker(true)}>
                Select Date
              </Button>
            </Flex>

            <Text color="red.500" fontSize="xs">
              {errors.birthday?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.phone}>
            <FormControl.Label>Số điện thoại</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input onChangeText={onChange} onBlur={onBlur} value={value} />
              )}
              name="phone"
            />
            <Text color="red.500" fontSize="xs">
              {errors.phone?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input onChangeText={onChange} onBlur={onBlur} value={value} />
              )}
              name="email"
            />
            <Text color="red.500" fontSize="xs">
              {errors.email?.message}
            </Text>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  type="password"
                />
              )}
              name="password"
            />
            <Text color="red.500" fontSize="xs">
              {errors.password?.message}
            </Text>
          </FormControl>
          <Button
            mt="2"
            mb="10"
            colorScheme="red"
            borderRadius="3xl"
            onPress={handleSubmit(mutateSignUp)}>
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
                <Button
                  colorScheme="red"
                  mr={3}
                  onPress={handleSubmitOtp}
                  isLoading={isPendingSignUp}>
                  Submit
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
      {showDatePicker && (
        <DateTimePicker
          value={watch('birthday') ? new Date(watch('birthday')) : new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChangeDate}
        />
      )}
    </Center>
  );
}
