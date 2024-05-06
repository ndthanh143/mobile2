import {Box, Icon, Menu, Pressable} from 'native-base';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

function Notification() {
  return (
    <Box w="90%" alignItems="center">
      <Menu
        w="190"
        placement={'right bottom'}
        trigger={triggerProps => {
          return (
            <Pressable {...triggerProps}>
              <Icon
                as={<MaterialCommunityIcons name={'bell'} />}
                color={'rgba(250, 219, 20, 255)'}
                // mt={-1}
                mr={2}
                size={'lg'}
              />
            </Pressable>
          );
        }}>
        <Menu.Group title="Thông báo">
          <Menu.Item>Arial</Menu.Item>
          <Menu.Item>Nunito Sans</Menu.Item>
          <Menu.Item>Roboto</Menu.Item>
        </Menu.Group>
        <Divider mt="3" w="100%" />
      </Menu>
    </Box>
  );
}
