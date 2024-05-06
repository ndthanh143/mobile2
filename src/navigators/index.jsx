import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CartScreen,
  CategoryScreen,
  EditInfoScreen,
  ForgotPasswordScreen,
  HomeScreen,
  InfoScreen,
  MyAddressScreen,
  OrderSuccessScreen,
  PaymentMethodScreen,
  PaymentScreen,
  SearchScreen,
  SignInScreen,
  SignUpScreen,
} from '../screens';
import {DetailScreen} from '../screens/Detail';
import ProfileScreen from '../screens/Profile';
import MyOrderScreen from '../screens/Profile/MyOrder';
import OrderDetailScreen from '../screens/OrderDetail';

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
      <Stack.Screen name="My Order" component={MyOrderScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment Method" component={PaymentMethodScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Order Success" component={OrderSuccessScreen} />
      <Stack.Screen name="Order Detail" component={OrderDetailScreen} />
      <Stack.Screen name="Edit Info" component={EditInfoScreen} />
      <Stack.Screen name="My Address" component={MyAddressScreen} />
    </Stack.Navigator>
  );
};
