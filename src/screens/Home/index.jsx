import {Box, Center, FlatList, Spinner} from 'native-base';
import {Text} from 'react-native';
import Card from '../../container/card';
import {useEffect, useState} from 'react';

export function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Thực hiện gọi API để lấy danh sách sản phẩm
    fetch('https://tech-market.space/v1/product/auto-complete')
      .then(response => response.json())
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  console.log(products);
  return (
    <Center w="100%">
      {loading ? (
        <Spinner color="red.500" />
      ) : (
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
      )}
    </Center>
  );
}
