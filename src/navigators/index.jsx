import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen} from '../screens';

const Stack = createNativeStackNavigator();

export const Navigators = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
