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

const Stack = createNativeStackNavigator();

export const Navigators = () => {
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
