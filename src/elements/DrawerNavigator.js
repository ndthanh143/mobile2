import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile'; 

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />

        {/* Thêm các màn hình khác ở đây */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
