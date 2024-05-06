import {
  Text,
  Flex,
  Spinner,
  Box,
  Avatar,
  Center,
  Button,
  VStack,
  HStack,
  ChevronRightIcon,
  Modal,
  FormControl,
  TextArea,
  Input,
} from 'native-base';
import {useAuth} from '../../../hooks';
import {limitCharacters} from '../../../utils';
import {useState} from 'react';
import {userApi} from '../../../apis';
import {useMutation} from '@tanstack/react-query';
import {ModalEdit} from './ModalEdit';

export const EditInfoScreen = ({navigation}) => {
  const {profile} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState();

  return (
    <Flex h={'100%'} justify="start" align="center">
      <Center h={'150px'} w={'100%'} bgColor={'red.500'}>
        <Avatar size="70px" source={{uri: profile?.avatar}} />
      </Center>
      <Box w={'100%'}>
        <Button
          onPress={() => {
            setShowModal(true), setModalKey('fullName');
          }}
          mt={2}
          // endIcon={<ChevronRightIcon size="5" mt="0.5" color="#2f2f2f" />}
          backgroundColor={'#f9f9f9'}
          // variant="ghost"
        >
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            w={'100%'}>
            <Text fontSize={'lg'} color={'#2f2f2f'}>
              Tên
            </Text>
            <HStack>
              <Text fontSize={'xl'} color={'#2f2f2f'} bold>
                {profile.fullName}
              </Text>
              <ChevronRightIcon size="5" mt="1.5" color="#2f2f2f" />
            </HStack>
          </Flex>
        </Button>
        <Button
          onPress={() => navigation.navigate('Info')}
          mt={2}
          backgroundColor={'#f9f9f9'}>
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            w={'100%'}>
            <Text fontSize={'lg'} color={'#2f2f2f'}>
              Bio
            </Text>
            <Flex direction="row" align="center" h={'100%'}>
              <Text fontSize={'lg'} color={'gray.400'} bold>
                Thiết lập ngay
              </Text>
              <ChevronRightIcon size="5" mt="1.5" color="#2f2f2f" />
            </Flex>
          </Flex>
        </Button>
        <Button
          onPress={() => {
            setShowModal(true), setModalKey('email');
          }}
          mt={2}
          backgroundColor={'#f9f9f9'}>
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            w={'100%'}>
            <Text fontSize={'lg'} color={'#2f2f2f'}>
              Email
            </Text>
            <HStack>
              <Text fontSize={'lg'} color={'#2f2f2f'}>
                {limitCharacters(profile.email, 15)}
              </Text>
              <ChevronRightIcon size="5" mt="1.5" color="#2f2f2f" />
            </HStack>
          </Flex>
        </Button>
        <Button
          onPress={() => {
            setShowModal(true), setModalKey('phone');
          }}
          mt={2}
          backgroundColor={'#f9f9f9'}>
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            w={'100%'}>
            <Text fontSize={'lg'} color={'#2f2f2f'}>
              Số điện thoại
            </Text>
            <HStack>
              <Text fontSize={'lg'} color={'#2f2f2f'}>
                {profile.phone}
              </Text>
              <ChevronRightIcon size="5" mt="1.5" color="#2f2f2f" />
            </HStack>
          </Flex>
        </Button>
      </Box>
      <ModalEdit
        modalKey={modalKey}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Flex>
  );
};
