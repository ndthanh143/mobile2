import React from 'react';
import {
  Box,
  Image,
  ScrollView,
  Spinner,
  Flex,
  FlatList,
  Divider,
} from 'native-base';
import {Text as Text2} from 'native-base';

import Card from '../../container/card';
import {useQuery} from '@tanstack/react-query';
import {productApi} from '../../apis';
import {Footer} from '../../components';
import {AppBar} from './components';

export function HomeScreen({navigation}) {
  const {data: products, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });

  const {data: productsTop10} = useQuery({
    queryKey: ['products-top-10'],
    queryFn: () => productApi.getProductTop10(),
  });

  return (
    <Flex direction="column" h="100%" bgColor="white">
      <AppBar />

      <ScrollView>
        <Box width="100vw">
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
        {isLoading ? (
          <Spinner color="red.500" size="lg" />
        ) : (
          <Box padding={4}>
            <Text2
              fontSize="2xl"
              fontWeight="extrabold"
              textAlign="center"
              py={2}>
              Top 10 Sản phẩm bán chạy
            </Text2>
            <FlatList
              nestedScrollEnabled
              data={productsTop10}
              renderItem={({item}) => (
                <Box mr={4}>
                  <Card
                    data={item}
                    navigation={navigation}
                    key={`${item.id}-top10`}
                  />
                </Box>
              )}
              keyExtractor={item => `${item.id}-top10`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <Divider maxW={100} my={4} mx="auto" />
            <Text2
              fontSize="2xl"
              fontWeight="extrabold"
              textAlign="center"
              py={2}>
              Danh sách sản phẩm
            </Text2>
            {products?.map(item => (
              <Card data={item} navigation={navigation} key={item.id} />
            ))}
          </Box>
        )}
      </ScrollView>
      <Footer />
    </Flex>
  );
}
