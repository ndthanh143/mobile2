import {Flex, Icon, Progress, Text} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {AirbnbRating} from 'react-native-ratings';
import {calculateStars} from '../../../utils';
import {reviewApi} from '../../../apis/review';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export function StarProgress({productId}) {
  const {data: starData} = useQuery({
    queryKey: ['starData', productId],
    queryFn: () => reviewApi.starListReview(productId),
  });

  const {averageRating, ratingPercentages} = calculateStars(starData);

  return (
    <Flex direction="column" w={'100%'}>
      <AirbnbRating
        count={5}
        defaultRating={averageRating ? averageRating : 0}
        showRating={false}
        size={25}
      />

      {ratingPercentages
        .slice()
        .reverse()
        .map((percentage, index) => (
          <Flex
            key={index}
            m={1}
            direction="row"
            justify="center"
            align="center">
            <Text fontSize={'xl'} bold>
              {index + 1}
            </Text>
            <Icon
              as={<MaterialCommunityIcons name={'star'} />}
              color={'rgba(250, 219, 20, 255)'}
              // mt={-1}
              mr={2}
              size={'lg'}
            />
            <Progress
              colorScheme="rgba(250, 219, 20, 255)"
              value={percentage}
              w={'70%'}
            />
            <Text fontSize={'lg'} ml={2} w={'40px'}>
              {percentage}%
            </Text>
          </Flex>
        ))}
    </Flex>
  );
}
