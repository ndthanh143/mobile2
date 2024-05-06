import React, {useState} from 'react';
import {
  HStack,
  HamburgerIcon,
  Pressable,
  SearchIcon,
  Text,
  Menu,
  Icon,
  AlertDialog,
  Button,
} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons'; // Assuming you're using Expo
import {useNavigation} from '@react-navigation/native';
import {NotificationPopup} from './NotificationPopup';

export function AppBar() {
  const navigation = useNavigation();

  // State to manage AlertDialog visibility
  const [showAlert, setShowAlert] = useState(false);

  const onClose = () => setShowAlert(false);
  const onOpen = () => setShowAlert(true);

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
          {/* Menu and Home Text */}
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
        <HStack alignItems="center">
          {/* Search Icon */}
          <Pressable onPress={() => navigation.navigate('Search')} mr="3">
            <SearchIcon size="5" color="#ffffff" />
          </Pressable>
          {/* Notification Icon */}
          <Pressable onPress={onOpen}>
            <Icon
              as={<MaterialIcons name="notifications" />}
              size="5"
              color="#ffffff"
            />
          </Pressable>
        </HStack>
      </HStack>

      {/* AlertDialog for Notifications */}
      <NotificationPopup isOpen={showAlert} onClose={onClose} />
    </>
  );
}
