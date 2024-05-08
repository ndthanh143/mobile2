import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Input,
  Spinner,
  Text,
  Toast,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {object, string} from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../hooks';

const schema = object({
  username: string().required('Vui lòng nhập username'),
  password: string().required('Vui lòng nhập mật khẩu'),
  grant_type: string().required(),
});

export function SignInAdminScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: 'superAdmin',
      password: '123456',
      grant_type: 'password',
    },
  });

  const {profile, loginAdmin, isLoginAdminLoading, isLoginAdminError, logout} =
    useAuth();

  const onSubmit = data => {
    loginAdmin(data);
  };

  useEffect(() => {
    if (profile && profile.isSuperAdmin) {
      navigation.navigate('Dashboard');
      Toast.show({
        title: 'Đăng nhập thành công',
      });
    }
  }, [profile, loginAdmin, isLoginAdminLoading, logout, navigation]);

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
            Đăng nhập quản trị viên
          </Heading>
          {isLoginAdminError && ( // Render error message if there's an error
            <Text color="red.500" fontSize="xs">
              Tài khoản hoặc mật khẩu không chính xác
            </Text>
          )}

          <VStack space={3} mt="5">
            <FormControl isInvalid={errors.phone}>
              <FormControl.Label>Tên tài khoản</FormControl.Label>
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
                name="username"
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
            </FormControl>
            <Button
              mt="2"
              colorScheme="red"
              borderRadius="3xl"
              isLoading={isLoginAdminLoading}
              isDisabled={isLoginAdminLoading}
              onPress={handleSubmit(onSubmit)}>
              Đăng nhập
            </Button>

            <Divider my={2} />

            <Button
              mt="2"
              colorScheme="blue"
              borderRadius="3xl"
              onPress={() => {
                navigation.navigate('Sign In');
              }}>
              Đăng nhập người dùng
            </Button>
          </VStack>
        </Box>
      </Center>
    )
  );
}
