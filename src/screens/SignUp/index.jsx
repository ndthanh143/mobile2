import React from 'react';
import {
  Link,
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Box,
  FormControl,
  Input,
  Button,
  DatePicker,
} from 'native-base';

export function SignUpScreen() {
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
          <FormControl>
            <FormControl.Label>Họ và tên</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Ngày sinh</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Số điện thoại</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" mb="10" colorScheme="red">
            Đăng ký
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
