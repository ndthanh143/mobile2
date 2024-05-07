import {Avatar, Box, Center, HStack, Heading, Text, VStack} from 'native-base';
import {DEFAULT_FORMAT} from '../../../constants';
import {formatTimeDifference} from '../../../utils';
import {AirbnbRating} from 'react-native-ratings';
import userImage from '../../../assets/image/user.png';

export const CardStar = ({data}) => {
  return (
    <Box
      borderWidth="0.5"
      borderRadius={'xl'}
      _dark={{
        borderColor: 'muted.50',
      }}
      borderColor="muted.800"
      p={'10px'}
      w={'100%'}>
      <HStack space={[2, 3]} justifyContent="start" alignItems="center">
        <VStack>
          <Center>
            <Avatar
              size="lg"
              source={{
                uri:
                  data.userDto?.accountAutoCompleteDto?.avatarPath || userImage,
              }}
              mb={4}
              alt={data.userDto.fullName}
            />
          </Center>
        </VStack>
        <VStack>
          <HStack flex={1} justifyContent="between" space={[10, 1]}>
            <VStack justifyContent="between">
              <Heading size="sm">
                {data.userDto?.accountAutoCompleteDto?.fullName}
              </Heading>
              <AirbnbRating
                count={data.star}
                defaultRating={data?.star}
                showRating={false}
                size={15}
              />
            </VStack>
            <Text ml={2} fontSize="xs">
              {formatTimeDifference(data.createdDate, DEFAULT_FORMAT)}
            </Text>
          </HStack>

          <Text>{data?.message}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};
