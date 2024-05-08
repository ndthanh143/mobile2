import {useEffect, useState} from 'react';
import {userApi} from '../../../apis';
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Input,
  Modal,
  Select,
  useToast,
} from 'native-base';
import {useAuth} from '../../../hooks';
import {focusManager, useMutation, useQuery} from '@tanstack/react-query';
import {toastShow} from '../../../utils';
import {myAddressApi} from '../../../apis/myAddress';
import {Controller, useForm} from 'react-hook-form';

export const ModalEdit = ({modalKey, showModal, setShowModal, dataDetail}) => {
  const [formData, setData] = useState({});
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {profile} = useAuth();
  const [change, setChange] = useState();
  const [changePhone, setChangePhone] = useState();
  const toast = useToast();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const {mutate: createAddress, data} = useMutation({
    mutationFn: payload => myAddressApi.createAddress(payload),
    onSuccess: () => {
      setShowModal(false);
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Bạn đã tạo địa chỉ thành công!
            </Box>
          );
        },
      });
    },
    onError: error => {
      console.log('error', error);
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              Tạo địa chỉ thất bại!
            </Box>
          );
        },
      });
      setShowModal(false);
    },
  });

  const {mutate: updateAddress} = useMutation({
    mutationFn: payload => myAddressApi.updateAddress(payload),
    onSuccess: () => {
      console.log('log');
      setShowModal(false);
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Bạn đã cập nhật địa chỉ thành công!
            </Box>
          );
        },
      });
    },
    onError: error => {
      console.log('error', error);
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              Cập nhật địa chỉ thất bại!
            </Box>
          );
        },
      });
      setShowModal(false);
    },
  });

  const {data: province} = useQuery({
    queryKey: ['myProvince'],
    queryFn: () => myAddressApi.getNation({kind: 1}),
  });

  const {
    data: district,
    isFetched,
    refetch: fetchDistrict,
  } = useQuery({
    queryKey: ['myDistrict'],
    queryFn: () =>
      myAddressApi.getNation({kind: 2, parentId: formData?.provinceId}),
  });

  const {data: ward, refetch: fetchWard} = useQuery({
    queryKey: ['myWard'],
    queryFn: () => myAddressApi.getNation({kind: 3}),
  });

  const onSubmit = () => {
    if (!dataDetail) {
      createAddress({
        ...formData,
      });
    } else {
      updateAddress({
        address: dataDetail?.address,
        districtId: dataDetail?.districtInfo.id,
        name: dataDetail?.name,
        phone: dataDetail?.phone,
        provinceId: dataDetail?.provinceInfo.id,
        wardId: dataDetail?.wardInfo.id,
        id: dataDetail.id,
        ...formData,
      });
    }
  };

  useEffect(() => {
    if (formData?.provinceId) fetchDistrict();
    if (formData?.districtId) fetchWard();
  }, [formData?.provinceId, formData?.districtId]);
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={'xl'}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>
          {dataDetail ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
        </Modal.Header>
        <Modal.Body>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Họ tên
            </FormControl.Label>
            <Input
              onChangeText={value => setData({...formData, name: value})}
              defaultValue={dataDetail?.name}
            />
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Không được để trống
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Địa chỉ
            </FormControl.Label>
            <Input
              onChangeText={value => setData({...formData, address: value})}
              value={dataDetail?.address}
            />
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Không được để trống
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Số điện thoại
            </FormControl.Label>
            <Input
              onChangeText={value => setData({...formData, phone: value})}
              value={dataDetail?.phone}
            />
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Không được để trống
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Tỉnh
            </FormControl.Label>
            <Select
              selectedValue={
                dataDetail?.provinceInfo
                  ? dataDetail.provinceInfo.id
                  : selectedProvince
              }
              minWidth="200"
              _selectedItem={{
                bg: 'gray.200',
                endIcon: <CheckIcon size="5" color="red.500" />,
              }}
              mt={1}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedProvince(itemValue);
                setData({...formData, provinceId: itemValue});
              }}>
              {province?.map((item, index) => (
                <Select.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Select>
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Không được để trống
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Quận/Huyện
            </FormControl.Label>
            <Select
              selectedValue={
                dataDetail?.districtInfo
                  ? dataDetail.districtInfo.id
                  : selectedProvince
              }
              minWidth="200"
              _selectedItem={{
                bg: 'gray.200',
                endIcon: <CheckIcon size="5" color="red.500" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setData({...formData, districtId: itemValue});
                setSelectedDistrict(itemValue);
              }}>
              {district?.map((item, index) => (
                <Select.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Select>
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Không được để trống
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Phường
            </FormControl.Label>
            <Select
              selectedValue={
                dataDetail?.wardInfo ? dataDetail.wardInfo.id : selectedProvince
              }
              minWidth="200"
              _selectedItem={{
                bg: 'gray.200',
                endIcon: <CheckIcon size="5" color="red.500" />,
              }}
              mt={1}
              onValueChange={itemValue => {
                setData({...formData, wardId: itemValue});
                setSelectedWard(itemValue);
              }}>
              {ward?.map((item, index) => (
                <Select.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Select>
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Không được để trống
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="outline"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}>
              Đóng
            </Button>

            <Button colorScheme="red" onPress={() => onSubmit()}>
              Xác nhận
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
