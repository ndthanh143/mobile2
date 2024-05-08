import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from 'native-base';
import {DEFAULT_FORMAT} from '../../../constants';
import {formatTimeDifference} from '../../../utils';
import {AirbnbRating} from 'react-native-ratings';
import userImage from '../../../assets/image/user.png';

export const CardStar = ({data}) => {
  console.log('data', data);
  return (
    <Box
      borderWidth="0.5"
      borderRadius={'xl'}
      _dark={{
        borderColor: 'muted.50',
      }}
      borderColor="muted.800"
      p={'10px'}
      w={300}
      ml={4}>
      <HStack space={[2, 3]} alignItems="center">
        <VStack>
          <Center>
            <Avatar
              size="lg"
              source={{
                uri: data.userDto?.accountAutoCompleteDto?.avatarPath,
              }}
              mb={4}
              alt={data.userDto.accountAutoCompleteDto.fullName}>
              {String(data.userDto.accountAutoCompleteDto.fullName)
                .charAt(0)
                .toUpperCase()}
            </Avatar>
          </Center>
        </VStack>
        <VStack>
          <Flex direction="row" flex={1} justifyContent="between">
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
          </Flex>

          <Text maxW={200}>{data?.message}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};
