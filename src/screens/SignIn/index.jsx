import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  Select,
  Toast,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {Text} from 'react-native';
import {object, string} from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../hooks';

const schema = object({
  phone: string().required('Vui lòng nhập số điện thoại'),
  password: string().required('Vui lòng nhập mật khẩu'),
  grant_type: string().required(),
});

export function SignInScreen({navigation}) {
  const [grantType, setGrantType] = useState('user');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '0965456023',
      password: '123456',
      grant_type: grantType,
    },
  });

  const {profile, login, isLoginError, isLoginLoading, logout} = useAuth();

  const onSubmit = data => {
    login(data);
  };

  useEffect(() => {
    if (profile) {
      navigation.navigate('Home');
      Toast.show({
        title: 'Đăng nhập thành công',
      });
    }
  }, [profile, login, isLoginLoading, logout, navigation]);

  return (
    !profile && (
      <Center w="100%" bgColor="white" height="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Đăng nhập
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Đăng nhập để tiếp tục!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isInvalid={errors.phone}>
              <FormControl.Label>Số điện thoại hoặc Email</FormControl.Label>
              <Controller
                isInvalid={errors.phone}
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="phone"
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.phone?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormControl.Label>Mật khẩu</FormControl.Label>
              <Controller
                control={control}
                isInvalid={errors.password}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry
                  />
                )}
                name="password"
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.password?.message}
              </FormControl.ErrorMessage>

              {isLoginError && ( // Render error message if there's an error
                <Text color="red.500" fontSize="xs">
                  Tài khoản hoặc mật khẩu không chính xác
                </Text>
              )}
            </FormControl>
            <FormControl isInvalid={errors.grant_type}>
              <FormControl.Label>Loại tài khoản</FormControl.Label>
              <Select
                selectedValue={grantType}
                minWidth="200"
                onValueChange={itemValue => setGrantType(itemValue)}>
                <Select.Item label="User" value="user" />
                <Select.Item label="Admin" value="password" />
              </Select>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.grant_type?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={() => navigation.navigate('Forgot Password')}>
              Quên mật khẩu?
            </Link>
            <Button
              mt="2"
              colorScheme="red"
              borderRadius="3xl"
              isLoading={isLoginLoading}
              isDisabled={isLoginLoading}
              onPress={handleSubmit(onSubmit)}>
              Đăng nhập
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                Chưa có tài khoản.{' '}
              </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => {
                  navigation.navigate('Sign Up');
                }}>
                Đăng ký
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    )
  );
}
