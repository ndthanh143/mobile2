import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AdminOrderDetail,
  AdminOrdersManagement,
  AdminProfileScreen,
  CartScreen,
  CategoryScreen,
  DashboardScreen,
  EditInfoScreen,
  FavoriteScreen,
  ForgotPasswordScreen,
  HomeScreen,
  InfoScreen,
  MyAddressScreen,
  OrderSuccessScreen,
  PaymentMethodScreen,
  PaymentScreen,
  SearchScreen,
  SignInAdminScreen,
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
    <Stack.Navigator initialRouteName="Sign In">
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen
        name="Admin Order Management"
        component={AdminOrdersManagement}
      />
      <Stack.Screen name="Admin Profile" component={AdminProfileScreen} />
      <Stack.Screen name="Admin Order Detail" component={AdminOrderDetail} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign In Admin" component={SignInAdminScreen} />
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
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};
