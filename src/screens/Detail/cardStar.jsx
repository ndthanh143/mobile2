import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
} from 'native-base';
import {useState} from 'react';
import {DATE_FORMAT_VALUE, DEFAULT_FORMAT} from '../../constants';
import {convertUtcToLocalTime, formatTimeDifference} from '../../utils';
import {AirbnbRating} from 'react-native-ratings';
import userImage from '../../assets/image/user.png';

const CardStar = ({data, colorCard, navigation}) => {
  const [loading, setLoading] = useState(false);
  const onCLick = () => {
    setLoading(true);
    navigation.navigate('Order Detail', {
      id: data?.id,
      orderData: data,
      orderState: colorCard?.orderState,
    });
  };
  return (
    <Box
      borderWidth="0.5"
      borderRadius={'xl'}
      _dark={{
        borderColor: 'muted.50',
      }}
      borderColor="muted.800"
      p={'10px'}
      w={'100%'}
      mb={2}>
      <HStack space={[2, 3]} justifyContent="start" alignItems="center">
        <VStack>
          <Center>
            <Avatar
              size="lg"
              source={
                data?.userDto?.accountAutoCompleteDto?.avatarPath
                  ? data?.userDto?.accountAutoCompleteDto?.avatarPath
                  : userImage
              }
              mb={4}
              // defaultSource={}
              alt="no image here"
            />
            <Heading size="sm">
              {data?.userDto?.accountAutoCompleteDto?.fullName}
            </Heading>
          </Center>
        </VStack>
        <VStack>
          <HStack>
            <AirbnbRating
              count={5}
              defaultRating={data?.star}
              showRating={false}
              size={15}
            />
            <Text ml={2}>
              {formatTimeDifference(data?.createdDate, DEFAULT_FORMAT)}
            </Text>
          </HStack>
          <Text w={'60%'} mt={2}>
            {data?.message}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CardStar;
