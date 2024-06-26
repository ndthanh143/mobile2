import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {Navigators} from './src/navigators';
// import {NativeModules} from 'react-native';
// NativeModules.DevSettings.setIsDebuggingRemotely(false);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider isSSR={false}>
        <NavigationContainer>
          <Navigators />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
