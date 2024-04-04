import React from 'react';
import {
  HStack,
  HamburgerIcon,
  Pressable,
  SearchIcon,
  Text,
  Menu,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export function AppBar() {
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
