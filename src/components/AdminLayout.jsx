import {Box, Center, Flex, ScrollView, Spinner} from 'native-base';
import {useAuth} from '../hooks';
import {useEffect} from 'react';
import {FooterAdmin} from './FooterAdmin';
import {useNavigation} from '@react-navigation/native';

export function AdminLayout({children}) {
  const navigation = useNavigation();
  const {profile, isLoading, accessToken, isFetched} = useAuth();

  useEffect(() => {
    if ((profile && !profile.isSuperAdmin) || (!profile && isFetched)) {
      navigation.navigate('Sign In Admin');
    }
  }, [profile, accessToken]);

  if (isLoading)
    return (
      <Center height="100%" bgColor="white">
        <Spinner size="lg" />
      </Center>
    );

  return (
    <Flex direction="column" h="100%" bgColor="white">
      <ScrollView bgColor="white" height="100%">
        {children}
      </ScrollView>
      <FooterAdmin />
    </Flex>
  );
}
