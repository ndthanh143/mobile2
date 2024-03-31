import {
  View,
  ScrollView,
  Image,
  Text,
  Button,
  Avatar,
  Box,
  Center,
  Heading,
  VStack,
} from 'native-base';
import {useEffect, useState} from 'react';
import {useAuth} from '../../../hooks';

const InfoScreen = ({navigator}) => {
  const [data, setData] = useState(null);
  const {profile, login, isLoginError, isLoginLoading} = useAuth();
  useEffect(() => {
    if (profile) {
      setData(profile);
    }
  }, []);
  return (
    <ScrollView>
      {data ? (
        <View p={4}>
          <Center>
            <Avatar size="2xl" source={{uri: data?.avatar}} mb={4} />
            <Heading size="lg" mb={2}>
              {data.fullName}
            </Heading>
            <Text fontSize="md" color="gray.500">
              Software Developer
            </Text>
          </Center>
          <Box bg="white" p={4} mt={4} shadow={2} borderRadius={8}>
            <Heading size="md" mb={2}>
              About Me
            </Heading>
            <Text color="gray.600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              aliquam arcu non leo fermentum, vel eleifend nisi convallis. Ut
              sit amet justo eu eros scelerisque ultricies vel vel nulla. Donec
              eget viverra urna. Proin tristique velit sed turpis scelerisque,
              nec consectetur urna auctor. Maecenas viverra velit at nibh
              ultricies, eget venenatis est ultrices. Duis at magna vitae sem
              vulputate finibus eu vel enim.
            </Text>
          </Box>
          <Box bg="white" p={4} mt={4} shadow={2} borderRadius={8}>
            <Heading size="md" mb={2}>
              Contact
            </Heading>
            <VStack space={2}>
              <Text color="gray.600">Email: {data.email}</Text>
              <Text color="gray.600">Phone: {data.phone}</Text>
              <Text color="gray.600">Address: 01 Võ Văn Ngân, TP.HCM, VN</Text>
            </VStack>
          </Box>
          <Button mt={4}>Edit Profile</Button>
        </View>
      ) : (
        <View p={4}>
          <Avatar
            size="2xl"
            source={{uri: 'https://via.placeholder.com/150'}}
            mb={4}
          />
          <Heading size="lg" mb={2}>
            No data
          </Heading>
        </View>
      )}
    </ScrollView>
  );
};

export default InfoScreen;
