import React from 'react';
import {Center, HStack, Pressable, Text, Icon} from 'native-base';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';

export function FooterAdmin() {
  const route = useRoute();
  const routeName = route.name;
  const [selected, setSelected] = React.useState(routeName);
  const navigation = useNavigation();

  return (
    <>
      <HStack bg="primary.800" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 'Dashboard' ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => navigation.navigate('Dashboard')}>
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={
                    selected === 0 ? 'view-dashboard' : 'view-dashboard-outline'
                  }
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Dashboard
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 'Admin Order Management' ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => navigation.navigate('Admin Order Management')}>
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialIcons
                  name={selected === 1 ? 'book' : 'bookmark-outline'}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Order
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 'Admin Profile' ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => navigation.navigate('Admin Profile')}>
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialIcons
                  name={selected === 2 ? 'account-box' : 'account-circle'}
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
