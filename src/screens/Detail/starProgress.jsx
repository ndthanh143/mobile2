import {Image, Dimensions, View, StyleSheet} from 'react-native';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  ChevronRightIcon,
  Container,
  Flex,
  Heading,
  Icon,
  NativeBaseProvider,
  Pressable,
  Progress,
  ScrollView,
  Select,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import {productApi} from '../../apis';
import {useQuery} from '@tanstack/react-query';
let {height, width} = Dimensions.get('window');
import {AirbnbRating} from 'react-native-ratings';
import {calculateStars, limitCharacters} from '../../utils';
import Card from '../../container/card';
import {useCart} from '../../hooks';
import {useState} from 'react';
import {LoadingContainer} from '../../components';
import {reviewApi} from '../../apis/review';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

export function StarProgress({route, navigation}) {
  // const {id} = route.params;
  const id = 7022431260213248;

  const {addItemToCart} = useCart();
  const [color, setColor] = useState();

  const {data: starData} = useQuery({
    queryKey: ['starData'],
    queryFn: () => reviewApi.starListReview(id),
  });

  const {isOpen, onOpen, onClose} = useDisclose();

  const handleAddToCart = async () => {
    await addItemToCart({...detail, variant: color});
  };

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
