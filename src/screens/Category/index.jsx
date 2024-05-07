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
  Flex,
  Skeleton,
} from 'native-base';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {categoryService, productApi} from '../../apis';
import {ActivityIndicator} from 'react-native';

const ProductSkeleton = () => {
  return (
    <Flex direction="row">
      <Box width={'28%'}>
        <Skeleton my={2} height={120} />
      </Box>
      <Box flex={1}>
        <Skeleton.Text px={4} lines={2} my={2} />
        <Skeleton.Text px={4} lines={3} my={2} />
      </Box>
    </Flex>
  );
};

export const CategoryScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetched: isFetchedCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const fetchProducts = async ({pageParam = 0, categoryName}) => {
    if (!categoryName) {
      return;
    }

    const data = await productApi.getProductList({
      categoryName: categoryName,
      page: pageParam,
      size: 5,
    });

    return {
      content: data.content,
      nextPage: pageParam + 1 < data.totalPages ? pageParam + 1 : undefined,
    };
  };

  const {
    data: products,
    isLoading: isLoadingProducts,
    fetchNextPage,
    hasNextPage,
    isFetched: isFetchedProductsCategory,
    refetch: refetchProducts,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['product-category', selectedCategory],
    queryFn: ({pageParam}) =>
      fetchProducts({pageParam, categoryName: selectedCategory}),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage ?? false;
    },
    enabled: Boolean(selectedCategory),
  });

  const handleLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

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

  useEffect(() => {
    if (categories?.content?.length > 0) {
      setSelectedCategory(categories.content[0].name);
    }
  }, [categories]);

  useEffect(() => {
    if (isFetchedProductsCategory) {
      refetchProducts();
    }
  }, [selectedCategory]);

  const data = products?.pages.flatMap(page => page.content) || [];

  return isLoadingCategories ? (
    <Box py={4}>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </Box>
  ) : (
    <Box flex={1} p="5" bgColor="white">
      <VStack space={4} flex={1}>
        <Select
          minWidth="200"
          accessibilityLabel="Choose Category"
          placeholder="Choose Category"
          _selectedItem={{
            bg: 'gray.200',
            endIcon: <CheckIcon size="5" color="red.500" />,
          }}
          mt={1}
          selectedValue={selectedCategory} // This ensures the Select shows the currently selected category
          onValueChange={itemValue => setSelectedCategory(itemValue)}>
          {categories?.content.map(category => (
            <Select.Item
              label={category.name}
              value={category.name} // Use category name as value for simplicity
              key={category.id}
            />
          ))}
        </Select>

        {isLoadingProducts ? (
          <Box>
            <Box py={4}>
              <ProductSkeleton />
            </Box>
            <Box py={4}>
              <ProductSkeleton />
            </Box>
            <Box py={4}>
              <ProductSkeleton />
            </Box>
          </Box>
        ) : (
          <FlatList
            data={data}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <Box py={4}>
                  <ProductSkeleton />
                </Box>
              ) : null
            }
            renderItem={renderItem}
            keyExtractor={item => item?.id.toString()}
          />
        )}

        {!data.length && <Text>No products found</Text>}
      </VStack>
    </Box>
  );
};
