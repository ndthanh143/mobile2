import {Button, FlatList, Flex, Heading, Icon, Text} from 'native-base';
import {myAddressApi} from '../../../apis/myAddress';
import Card from './card';
import {useQuery} from '@tanstack/react-query';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {ModalEdit} from './ModalEdit';
import {useEffect, useState} from 'react';

export const MyAddressScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const {
    data: MyAddress,
    isLoading,
    isFetching,
    refetch: refetchMyAddress,
  } = useQuery({
    queryKey: ['myAddress'],
    queryFn: () => myAddressApi.getAddress(),
  });
  useEffect(() => {
    refetchMyAddress();
  }, [showModal]);

  return (
    <Flex direction="column" justify="space-between" height="100%">
      <Heading size="lg" m={4}>
        Địa chỉ
      </Heading>
      <FlatList
        data={MyAddress?.content}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card
            data={item}
            navigation={navigation}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      />
      <Button
        w={'100%'}
        backgroundColor={'white'}
        textAlign={'center'}
        onPress={() => {
          setShowModal(true);
        }}
        leftIcon={
          <Icon
            as={<MaterialIcons name="add-circle-outline" />}
            size="xl"
            color={'red.500'}
          />
        }>
        <Text color={'red.500'} fontSize={'xl'}>
          Thêm địa chỉ mới
        </Text>
      </Button>
      <ModalEdit showModal={showModal} setShowModal={setShowModal} />
    </Flex>
  );
};
