import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CategoryScreen,
  ForgotPasswordScreen,
  HomeScreen,
  SearchScreen,
  SignInScreen,
  SignUpScreen,
} from '../screens';
import {DetailScreen} from '../screens/Detail';
import ProfileScreen from '../screens/Profile';
import InfoScreen from '../screens/Profile/info/index';
import MyOrderScreen from '../screens/Profile/MyOrder';

const Stack = createNativeStackNavigator();

export const Navigators = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="MyOrder" component={MyOrderScreen} />
    </Stack.Navigator>
  );
};
