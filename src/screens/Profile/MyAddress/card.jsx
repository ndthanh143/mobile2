import {
  Box,
  Button,
  Center,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {convertUtcToLocalTime, formatMoney} from '../../../utils';
import {DATE_FORMAT_VALUE, DEFAULT_FORMAT} from '../../../constants';
import {useState} from 'react';
import {ModalEdit} from './ModalEdit';

const Card = ({data, colorCard, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onCLick = () => {
    setLoading(true);
    navigation.navigate('Order Detail', {
      id: data?.id,
      orderData: data,
      orderState: colorCard?.orderState,
    });
  };
  return (
    <Pressable onPress={() => setShowModal(true)}>
      <Center flex={1}>
        <Box
          borderBottomWidth="2.5"
          // borderRadius={'xl'}
          _dark={{
            borderColor: 'muted.400',
          }}
          borderBottomColor="muted.200"
          px={'20px'}
          py={'10px'}
          w={'100%'}
          // h={'100px'}
          bgColor={'white'}>
          <VStack>
            <HStack alignItems={'flex-end'}>
              <Text fontSize={'lg'} bold>
                {data.name}
                {' | '}
              </Text>

              <Text color={'muted.400'} fontSize={'md'}>
                {data.phone}
              </Text>
            </HStack>
            <Text color={'muted.400'} fontSize={'sm'}>
              {data.address}
            </Text>
            <Text color={'muted.400'} fontSize={'sm'}>
              {data.wardInfo.name} {data.districtInfo.name}{' '}
              {data.provinceInfo.name}
            </Text>
          </VStack>
        </Box>
      </Center>
      <ModalEdit
        showModal={showModal}
        setShowModal={setShowModal}
        dataDetail={data}
      />
    </Pressable>
  );
};

export default Card;
