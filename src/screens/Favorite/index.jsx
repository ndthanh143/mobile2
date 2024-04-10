import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {Footer, LoadingContainer} from '../../components';
import {useFavorite} from '../../hooks';

export function FavoriteScreen({navigation}) {
  const {data, isLoading, removeItemFromFavorite} = useFavorite();

  return isLoading ? (
    <LoadingContainer />
  ) : (
    <Flex direction="column" h="100%" bgColor="white">
      <ScrollView bg="white">
        <Heading padding={4} textAlign="center">
          Danh sách yêu thích
        </Heading>
        <VStack space={4} alignItems="center" mt="4">
          {data.length > 0 ? (
            data.map(product => (
              <Box
                key={product.id}
                width="90%"
                maxWidth="400px"
                borderWidth="1"
                borderColor="coolGray.300"
                borderRadius="md"
                overflow="hidden">
                <Image
                  source={{uri: product.image}}
                  alt={product.name}
                  width="100%"
                  height="150px"
                />
                <VStack space={2} p="4">
                  <Text fontSize="lg" fontWeight="bold">
                    {product.name}
                  </Text>
                  <Text fontSize="sm" color="primary.500">
                    {product.categoryDto.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="coolGray.800"
                    isTruncated
                    noOfLines={3}>
                    {product.description}
                  </Text>
                  <Text color="emerald.500" bold>
                    {product.price.toLocaleString('en-US')}đ
                  </Text>
                  <Button
                    size="sm"
                    borderRadius="full"
                    onPress={() =>
                      navigation.navigate('Detail', {id: product.id})
                    }>
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    size="sm"
                    borderRadius="full"
                    backgroundColor="red.500"
                    onPress={() => removeItemFromFavorite(product.id)}>
                    Xoá khỏi mục yêu thích
                  </Button>
                </VStack>
              </Box>
            ))
          ) : (
            <Text>Chưa có sản phẩm nào trong mục yêu thích</Text>
          )}
        </VStack>
      </ScrollView>
      <Footer />
    </Flex>
  );
}
