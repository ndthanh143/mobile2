import {
  AlertDialog,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Pressable,
  Text,
  Toast,
  VStack,
} from 'native-base';
import {convertUtcToLocalTime, formatMoney} from '../../../utils';
import {DATE_FORMAT_VALUE, DEFAULT_FORMAT} from '../../../constants';
import {useState} from 'react';
import {ModalEdit} from './ModalEdit';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {useMutation} from '@tanstack/react-query';
import {myAddressApi} from '../../../apis/myAddress';

const Card = ({data, colorCard, navigation, refetchMyAddress}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const {mutate: deleteAddress, isPending: deleteLoading} = useMutation({
    mutationFn: id => myAddressApi.deleteAddress(id),
    onSuccess: () => {
      refetchMyAddress;
      Toast.show({
        placement: 'top',
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Bạn đã xóa địa chỉ thành công!
            </Box>
          );
        },
      });
    },
    onError: error => {
      console.log('error', error);
      Toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              Xóa địa chỉ thất bại!
            </Box>
          );
        },
      });
      setShowModal(false);
    },
  });
  const onCLick = e => {
    // setLoading(true);
    // navigation.navigate('Order Detail', {
    //   id: data?.id,
    //   orderData: data,
    //   orderState: colorCard?.orderState,
    // });
    console.log('record', data.id);
    deleteAddress(data.id);
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
          <HStack>
            <VStack w={'290px'}>
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
            <VStack>
              <Pressable
                cursor="pointer"
                p="3"
                flex={1}
                onPress={(e, record) => {
                  e.stopPropagation();
                  // onCLick();
                  // deleteAddress(data.id);
                  setIsOpen(true);
                }}
                h={'100%'}
                w={'50px'}>
                <Center>
                  <Icon
                    as={<MaterialIcons name="delete-outline" />}
                    size="2xl"
                    color={'red.500'}
                  />
                </Center>
              </Pressable>
            </VStack>
          </HStack>
        </Box>
      </Center>
      <ModalEdit
        showModal={showModal}
        setShowModal={setShowModal}
        dataDetail={data}
      />
      <AlertDialog
        // leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Customer</AlertDialog.Header>
          <AlertDialog.Body>Bạn có chắc muốn xóa địa chỉ?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}>
                {/* // ref={cancelRef} */}
                Hủy
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                Xác nhận
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Pressable>
  );
};

export default Card;
