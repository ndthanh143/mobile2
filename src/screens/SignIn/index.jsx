import React, {useEffect} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {Text} from 'react-native';
import {object, string} from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../hooks';

const schema = object({
  phone: string().required(),
  password: string().required(),
});

export function SignInScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '0966355046',
      password: '123456789',
    },
  });

  const {profile, login, isLoginError, isLoginLoading} = useAuth();

  const onSubmit = data => {
    login(data);
  };

  console.log('isLoginLoading', isLoginLoading);

  useEffect(() => {
    if (profile) {
      navigation.navigate('Home');
    }
  }, [profile, login, isLoginLoading, navigation]);

  return (
    <Center w="100%">
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
                <Input onChangeText={onChange} onBlur={onBlur} value={value} />
              )}
              name="phone"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.phone.message}
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
              {errors.password.message}
            </FormControl.ErrorMessage>

            {isLoginError && ( // Render error message if there's an error
              <Text color="red" fontSize="xs">
                Đăng nhập không thành công. Vui lòng thử lại.
              </Text>
            )}
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
          </FormControl>
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
  );
}
