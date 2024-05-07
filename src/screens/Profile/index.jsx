import {
  View,
  ScrollView,
  Image,
  Text,
  Button,
  Avatar,
  Box,
  Center,
  Heading,
  VStack,
  Flex,
  HStack,
  Spacer,
  ChevronRightIcon,
  useDisclose,
  Actionsheet,
} from 'native-base';
import {useEffect, useState} from 'react';
import {useAuth} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';

const ProfileScreen = ({navigation}) => {
  const {profile, login, isLoginError, isLoginLoading, logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Sign In');
  };

  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <Flex direction="column" justify="space-between" height="100%">
      {profile ? (
        <>
          <Box
            borderBottomWidth="0.5"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.800"
            pl={'10px'}
            pr={['0', '5']}
            py="2"
            px="5">
            <HStack space={[2, 3]} justifyContent="start" alignItems="center">
              <Avatar size="88px" source={{uri: profile.avatar}} />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                  fontSize="2xl">
                  {profile.fullName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontSize="md">
                  {profile.email}
                </Text>
              </VStack>
              {/* <Spacer /> */}
            </HStack>
          </Box>
          <Box>
            <Button
              onPress={() => navigation.navigate('My Order')}
              mt={2}
              // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
              backgroundColor={'#f9f9f9'}
              // variant="ghost"
            >
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                w={'100%'}>
                <VStack>
                  <Text fontSize={'xl'} color={'#2f2f2f'} bold>
                    Đơn hàng của bạn
                  </Text>
                  <Text fontSize={'sm'} color={'#2f2f2f'}>
                    Bạn có 12 đơn hàng
                  </Text>
                </VStack>
                <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />
              </Flex>
            </Button>
            <Button
              onPress={() => navigation.navigate('My Address')}
              mt={2}
              // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
              backgroundColor={'#f9f9f9'}
              // variant="ghost"
            >
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                w={'100%'}>
                <VStack>
                  <Text fontSize={'xl'} color={'#2f2f2f'} bold>
                    Địa chỉ giao hàng
                  </Text>
                  <Text fontSize={'sm'} color={'#2f2f2f'}>
                    2 địa chỉ
                  </Text>
                </VStack>
                <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />
              </Flex>
            </Button>
            <Button
              onPress={() => navigation.navigate('Info')}
              mt={2}
              // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
              backgroundColor={'#f9f9f9'}
              // variant="ghost"
            >
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                w={'100%'}>
                <VStack>
                  <Text fontSize={'xl'} color={'#2f2f2f'} bold>
                    Thông tin cá nhân
                  </Text>
                  <Text fontSize={'sm'} color={'#2f2f2f'}>
                    Chỉnh sửa
                  </Text>
                </VStack>
                <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />
              </Flex>
            </Button>
            <Button
              onPress={onOpen}
              mt={2}
              // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
              backgroundColor={'#f9f9f9'}
              // variant="ghost"
            >
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                w={'100%'}>
                <VStack>
                  <Text fontSize={'xl'} color={'#2f2f2f'} bold>
                    Cài đặt
                  </Text>
                  <Text fontSize={'sm'} color={'#2f2f2f'}>
                    Thiết lập tài khoản, mật khẩu
                  </Text>
                </VStack>
                <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />
              </Flex>
            </Button>
            <Button
              onPress={handleLogout}
              mt={2}
              // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
              backgroundColor={'#f9f9f9'}
              // variant="ghost"
            >
              <Flex
                direction="row"
                justify="space-between"
                align="start"
                w={'100%'}>
                <VStack>
                  <Text fontSize={'xl'} color={'#2f2f2f'} bold>
                    Đăng xuất
                  </Text>
                  <Text fontSize={'sm'} color={'#2f2f2f'}>
                    Đăng xuất khỏi tài khoản
                  </Text>
                </VStack>
                <Box></Box>
                {/* <ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" /> */}
              </Flex>
            </Button>
          </Box>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Actionsheet.Item isDisabled>
                Tài khoản thanh toán
              </Actionsheet.Item>
              <Actionsheet.Item>Yêu thích</Actionsheet.Item>
              <Actionsheet.Item onPress={() => handleLogout()}>
                Đăng xuất
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </>
      ) : (
        <HStack
          space={[2, 3]}
          justifyContent="center"
          alignItems="center"
          h={'100%'}>
          <Button
            onPress={() => navigation.navigate('Sign In')}
            mt={2}
            // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
            backgroundColor={'red.500'}
            // variant="ghost"
          >
            Bạn phải đăng nhập
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default ProfileScreen;
