import React from 'react';
import {Center, HStack, Pressable, Text, Icon} from 'native-base';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';

export function Footer() {
  const route = useRoute();
  const routeName = route.name;
  const [selected, setSelected] = React.useState(routeName);
  const navigation = useNavigation();

  return (
    <>
      <HStack bg="red.500" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 'Home' ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}>
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? 'home' : 'home-outline'}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 'Search' ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => navigation.navigate('Search')}>
          <Center>
            <Icon
              mb="1"
              as={<MaterialIcons name="search" />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Search
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => navigation.navigate('Cart')}>
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 'Cart' ? 'cart' : 'cart-outline'}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Cart
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => navigation.navigate('Profile')}>
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 'Profile' ? 'account' : 'account-outline'}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </>
  );
}
