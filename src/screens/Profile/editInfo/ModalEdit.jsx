import {useState} from 'react';
import {userApi} from '../../../apis';
import {Button, FormControl, Input, Modal, useToast} from 'native-base';
import {useAuth} from '../../../hooks';
import {useMutation} from '@tanstack/react-query';

export const ModalEdit = ({modalKey, showModal, setShowModal}) => {
  const {profile, refetch} = useAuth();
  const [change, setChange] = useState();
  const [changePhone, setChangePhone] = useState();
  const toast = useToast();

  const title = {
    fullName: 'Tên',
    email: 'Email',
    phone: 'Số điện thoại',
  };

  const {mutate} = useMutation({
    mutationFn: payload => userApi.updateProfile(payload),
    onSuccess: data => {
      // navigation.navigate('Info');
      setChange(null);
      setChangePhone(null);
      setShowModal(false);
      console.log('data', data);
      toast.show({
        title: data?.message,
        placement: 'top',
        style: {backgroundColor: data.result ? 'green' : 'red'},
      });
      refetch();
    },
    onError: err => {
      toast.show({
        title: err.message,
        placement: 'top',
        style: {backgroundColor: 'red'},
      });
    },
  });

  const handleSubmit = () => {
    if (modalKey == 'fullName') {
      mutate({
        fullName: change,
        phone: profile.phone,
        gender: 2,
      });
    } else if (modalKey == 'email') {
      mutate({
        email: change,
        fullName: profile.fullName,
        phone: profile.phone,
        gender: 2,
      });
    } else if (modalKey == 'phone') {
      mutate({
        phone: change,
        fullName: profile.fullName,
        gender: 2,
      });
    }
  };
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Cập nhật thông tin</Modal.Header>
        <Modal.Body>
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              {title[modalKey]}
            </FormControl.Label>
            <Input
              placeholder={profile[modalKey]}
              onChangeText={value => setChange(value)}
            />
            <FormControl.ErrorMessage
              _text={{
                fontSize: 'xs',
              }}>
              Không được để trống
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="3"></FormControl>
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

            <Button colorScheme="red" onPress={() => handleSubmit()}>
              Xác nhận
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
