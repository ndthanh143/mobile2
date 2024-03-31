import React, {useEffect, useState} from 'react';
import {
  Box,
  Select,
  CheckIcon,
  Text,
  VStack,
  FlatList,
  Pressable,
  HStack,
  Image,
  Heading,
  Spacer,
  Spinner,
} from 'native-base';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {categoryService, productApi} from '../../apis';
import {ActivityIndicator} from 'react-native';

export const CategoryScreen = ({navigation}) => {
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState('');

  // Sample categories and products data

  const {data: categories, isLoading: isLoadingCategories} = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const fetchProducts = async ({pageParam = 1}) => {
    // Assuming page starts from 0, adjust if it starts from 1
    const categoryName = categories?.content[selectedCategory]?.name;

    if (!categoryName) {
      // Handle the case where the category name is not available.
      return;
    }

    const data = await productApi.getProductList({
      categoryName: categoryName,
      page: pageParam,
      size: 5, // Assuming 'size' controls the number of items per page
    });

    return {
      content: data.content, // Extract the products from the response
      nextPage: pageParam + 1 < data.totalPages ? pageParam + 1 : undefined, // Determine the next page
    };
  };

  const {
    data: products,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    fetchNextPage,
    hasNextPage,
    refetch: refetchProducts,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'product-category',
      categories?.content?.[selectedCategory]?.name,
    ],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) => {
      // Determine if there's a next page. This depends on your API's response structure.
      // Example assumes your API returns something like { data: [...], nextPage: 2 }
      return lastPage.nextPage ?? false;
    },
    enabled: Boolean(selectedCategory),
  });

  const handleLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  console.log('length:', products?.pages?.flatMap(page => page.content).length);
  console.log('hasNextPage', hasNextPage);

  useEffect(() => {
    if (categories?.content?.length > 0) {
      setSelectedCategory(1);
    }
  }, [categories]);

  useEffect(() => {
    if (Boolean(selectedCategory)) {
      queryClient.invalidateQueries({queryKey: ['product-category']});
    }
  }, [selectedCategory, queryClient]);

  const data = products?.pages.flatMap(page => page.content) || [];

  const renderItem = ({item}) =>
    item && (
      <Pressable
        onPress={() => navigation.navigate('Detail', {id: item.id})}
        key={item.id}>
        <Box
          borderBottomWidth="1"
          _dark={{borderColor: 'gray.300'}}
          borderColor="coolGray.200"
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
                {Number(item.price).toLocaleString('en-US')} VNĐ
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
    );

  return isLoadingCategories ? (
    <Box py={4}>
      <ActivityIndicator size="large" color="#0000ff" />
    </Box>
  ) : (
    <Box flex={1} p="5">
      <VStack space={4} flex={1}>
        <Select
          selectedValue={selectedCategory}
          minWidth="200"
          accessibilityLabel="Choose Category"
          placeholder="Choose Category"
          _selectedItem={{
            bg: 'gray.200',
            endIcon: <CheckIcon size="5" color="red.500" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedCategory(itemValue)}>
          {categories?.content.map((category, index) => (
            <Select.Item
              label={category.name}
              value={index}
              key={category.id}
            />
          ))}
        </Select>

        <FlatList
          data={data}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <Box py={4}>
                <ActivityIndicator size="large" color="#0000ff" />
              </Box>
            ) : null
          }
          renderItem={renderItem}
          keyExtractor={item => item?.id.toString()}
        />
        {!data.length && <Text>No products found</Text>}
      </VStack>
    </Box>
  );
};
