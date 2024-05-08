import {useQuery} from '@tanstack/react-query';
import {AlertDialog, Box, Divider, Text} from 'native-base';
import {notificationApi} from '../../../apis/notification';

export function NotificationPopup({isOpen, onClose}) {
  const {data} = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.getMyNoti(),
  });

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Thông báo</AlertDialog.Header>
        <AlertDialog.Body>
          {data?.content?.length > 0 ? (
            data?.content.map(item => (
              <Box key={item.id} borderRadius={4}>
                <Text>{item.msg}</Text>
                <Text fontSize="xs" color="gray.500">
                  {item.createdDate}
                </Text>
                <Divider my={4} />
              </Box>
            ))
          ) : (
            <Text>Không có thông báo nào</Text>
          )}
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
