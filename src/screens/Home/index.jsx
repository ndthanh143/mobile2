import {
  Box,
  Button,
  Center,
  FlatList,
  Image,
  ScrollView,
  Spinner,
} from 'native-base';
import {Text as Text2} from 'native-base';

import Card from '../../container/card';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {productApi} from '../../apis';
import {useAuth} from '../../hooks';

export function HomeScreen({navigation}) {
  const {data: products, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });

  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Sign In');
  };

  return (
    <ScrollView>
      <Button onPress={handleLogout}>Logout</Button>
      <Box backgroundColor="white">
        <Center w="100%">
          {isLoading ? (
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              py={10}
              height="100vh">
              <Spinner color="red.500" size="lg" />
            </Box>
          ) : (
            <>
              <Text2
                fontSize="2xl"
                fontWeight="extrabold"
                color="orange.500"
                textAlign="left"
                py={2}>
                Tech Market
              </Text2>
              <Box width="full">
                <Image
                  source={{
                    uri: 'https://img.freepik.com/premium-psd/horizontal-web-banner-with-laptop-laptop-mockup_451189-71.jpg',
                  }}
                  alt="Product Banner"
                  resizeMode="cover"
                  width="full"
                  height={200} // Adjust height as needed
                  mb={2}
                />
              </Box>
              <Text2
                fontSize="2xl"
                fontWeight="extrabold"
                textAlign="left"
                py={2}>
                Danh sách sản phẩm
              </Text2>
              <FlatList
                data={products}
                mt={5}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  // <Box borderWidth={1} p={2} my={2} borderRadius={8}>
                  //   <Text>{item.name}</Text>
                  //   <Text fontSize="sm" mt={1}>
                  //     {item.description}
                  //   </Text>
                  //   <Text fontSize="lg" fontWeight="bold" mt={2}>
                  //     ${item.price}
                  //   </Text>
                  // </Box>
                  <Card data={item} />
                )}
              />
            </>
          )}
        </Center>
      </Box>
    </ScrollView>
  );
}
