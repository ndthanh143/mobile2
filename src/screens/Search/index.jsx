import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {productApi} from '../../apis';
import _ from 'lodash';
import {
  Box,
  CloseIcon,
  FlatList,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Pressable,
  ScrollView,
  SearchIcon,
  Spacer,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import {useDebounce} from '../../hooks';
import {EmptyData, Footer} from '../../components';

export const SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const debounceSearchAddress = useDebounce(searchText);

  const {
    data: products,
    refetch: refetchProducts,
    isFetched,
    isFetching: isFetchingProducts,
  } = useQuery({
    queryKey: ['search-products'],
    queryFn: () => productApi.getProducts({name: searchText}),
    enabled: Boolean(debounceSearchAddress),
  });

  useEffect(() => {
    if (debounceSearchAddress) {
      refetchProducts();
    }
  }, [debounceSearchAddress]);

  return (
    <Flex direction="column" h="100%" bgColor="white">
      <View
        style={{
          flex: 1,
          justifyContent: 'top',
          alignItems: 'center',
          padding: 8,
          backgroundColor: 'white',
        }}>
        <Input
          value={searchText}
          isLoading={true}
          onChangeText={setSearchText}
          placeholder="Nhập tìm kiếm"
          marginY={4}
          InputRightElement={
            Boolean(searchText) ? (
              isFetchingProducts ? (
                <Spinner marginX={4} />
              ) : (
                <Pressable onPress={() => setSearchText('')}>
                  <CloseIcon marginX={4} />
                </Pressable>
              )
            ) : (
              <SearchIcon marginX={4} />
            )
          }
        />
        <ScrollView>
          {isFetched && products?.length === 0 && <EmptyData />}
          {products?.length > 0 && (
            <FlatList
              data={products}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => navigation.navigate('Detail', {id: item.id})}>
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'muted.50',
                    }}
                    borderColor="muted.800"
                    pl={['0', '4']}
                    pr={['0', '5']}
                    py="2">
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <Image
                        size="lg"
                        source={{
                          uri: item.image,
                        }}
                        alt={item.name}
                      />
                      <VStack>
                        <Heading size="md" maxWidth={'80%'}>
                          {item.name}
                        </Heading>
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {Number(item.price).toLocaleString('vi')} VNĐ
                        </Text>
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}
                          maxWidth={'80%'}
                          isTruncated
                          noOfLines={2}>
                          {item.description}
                        </Text>
                      </VStack>
                      <Spacer />
                    </HStack>
                  </Box>
                </Pressable>
              )}
              keyExtractor={item => item.id}
            />
          )}
        </ScrollView>
      </View>
      <Footer />
    </Flex>
  );
};
