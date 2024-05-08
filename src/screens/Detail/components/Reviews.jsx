import {Box, FlatList, Flex, Heading} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {reviewApi} from '../../../apis/review';
import {CardStar} from './CardStar';
import {StarProgress} from './StarProgress';

export function Reviews({productId}) {
  const {data: listReview} = useQuery({
    queryKey: ['listReviewData', productId],
    queryFn: () => reviewApi.getByProductPublic(productId),
  });

  return (
    listReview && (
      <Flex justifyContent="left" alignItems="start" mt={2}>
        <Heading mb={4}>Đánh giá sản phẩm</Heading>
        <StarProgress productId={productId} />
        <Box w={'100%'}>
          <FlatList
            data={listReview || []}
            mt={5}
            horizontal
            renderItem={({item}) => <CardStar data={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </Box>
      </Flex>
    )
  );
}
