import React from 'react';
import {
  Alert,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
} from 'native-base';
import {Text} from 'react-native';
import {object, string} from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import {authApi} from '../../apis';

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
  });

  const {mutate, isError} = useMutation({
    mutationFn: payload => authApi.signIn(payload),
    onSuccess: () => {
      navigation.navigate('Home');
    },
    onError: () => {},
  });

  const onSubmit = data => {
    mutate(data);
  };

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
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input onChangeText={onChange} onBlur={onBlur} value={value} />
              )}
              name="phone"
            />
            {errors.phone && (
              <Text color="red" fontSize="xs">
                {errors.phone.message}
              </Text>
            )}
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
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text color="red" fontSize="xs">
                {errors.password.message}
              </Text>
            )}
            {isError && ( // Render error message if there's an error
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
