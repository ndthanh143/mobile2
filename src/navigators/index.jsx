import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, SignInScreen, SignUpScreen} from '../screens';

const Stack = createNativeStackNavigator();

export const Navigators = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
