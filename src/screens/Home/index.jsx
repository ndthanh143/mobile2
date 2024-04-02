import React from 'react';
import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  HamburgerIcon,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  SearchIcon,
  Spinner,
  StatusBar,
  Text,
  View,
  MenuIcon,
  Menu,
  Icon,
  NativeBaseProvider,
  Flex,
} from 'native-base';
import {Text as Text2} from 'native-base';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

import Card from '../../container/card';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {productApi} from '../../apis';
import {useAuth} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {Footer} from '../../components';

export function HomeScreen({navigation}) {
  const {data: products, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });

  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Sign In');
  };

  // const Drawer = createDrawerNavigator();
  // function Drawer() {
  //   return (
  //     <NavigationContainer>
  //       <Drawer.Navigator initialRouteName="Home">
  //         <Drawer.Screen name="Home" component={HomeScreen} />
  //         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
  //       </Drawer.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  function AppBar() {
    const navigation = useNavigation();
    return (
      <>
        <HStack
          bg="red.500"
          px="5"
          py="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%">
          <HStack alignItems="center">
            {/* <IconButton icon={<Icon name="home" size={30} color="#000" />} /> */}
            <Menu
              w="190"
              trigger={triggerProps => {
                return (
                  <Pressable onPress={() => navigation.openDrawer()}>
                    <HamburgerIcon size="5" color="#ffffff" />
                  </Pressable>
                );
              }}>
              <Pressable>
                <Menu.Item>Trang cá nhân</Menu.Item>
              </Pressable>
            </Menu>
            <Text color="white" fontSize="20" fontWeight="bold" marginLeft={4}>
              Home
            </Text>
          </HStack>
          <HStack>
            {/* <IconButton icon={<Icon name="favorite" size="sm" color="white" />} /> */}
            {/* <Icon name="home" size={30} color="#000" /> */}
            {/* <IconButton
              icon={<Icon name="more-vert" size="sm" color="white" />}
            /> */}
            <Pressable onPress={() => navigation.navigate('Search')}>
              <SearchIcon size="5" color="#ffffff" />
            </Pressable>
          </HStack>
        </HStack>
      </>
    );
  }

  return (
    <Flex direction="column" h="100%">
      <AppBar />
      <ScrollView>
        <Center w="100%">
          {isLoading ? (
            <Flex direction="column" h="100%">
              <Spinner color="red.500" size="lg" />
            </Flex>
          ) : (
            <>
              <Box width="full">
                <Image
                  source={{
                    uri: 'https://img.freepik.com/premium-psd/horizontal-web-banner-with-laptop-laptop-mockup_451189-71.jpg',
                  }}
                  alt="Product Banner"
                  resizeMode="cover"
                  width="full"
                  height={200} // Adjust height as needed
                  mb={2}
                />
              </Box>
              <Text2
                fontSize="2xl"
                fontWeight="extrabold"
                textAlign="left"
                py={2}>
                Danh sách sản phẩm
              </Text2>
              <FlatList
                data={products}
                mt={5}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  // <Box borderWidth={1} p={2} my={2} borderRadius={8}>
                  //   <Text>{item.name}</Text>
                  //   <Text fontSize="sm" mt={1}>
                  //     {item.description}
                  //   </Text>
                  //   <Text fontSize="lg" fontWeight="bold" mt={2}>
                  //     ${item.price}
                  //   </Text>
                  // </Box>
                  <Card data={item} navigation={navigation} />
                )}
              />
            </>
          )}
        </Center>
      </ScrollView>
      <Footer />
    </Flex>
  );
}
