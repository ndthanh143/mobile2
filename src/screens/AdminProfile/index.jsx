import {Avatar, Button, Center, Heading, Stack} from 'native-base';
import {AdminLayout} from '../../components';
import {useAuth} from '../../hooks';

export function AdminProfileScreen() {
  const {profile, logout} = useAuth();

  return (
    <AdminLayout>
      <Center height="100%" style={{gap: 20}} p={4}>
        <Avatar bgColor="primary.500" size="xl">
          {String(profile?.fullName).charAt(0).toUpperCase()}
        </Avatar>
        <Stack style={{gap: 2}}>
          <Heading textAlign="center" size="lg">
            {profile?.fullName}
          </Heading>
          <Heading textAlign="center" size="sm">
            {profile?.email}
          </Heading>
        </Stack>
        <Button colorScheme="primary" onPress={logout} width="100%">
          Logout
        </Button>
      </Center>
    </AdminLayout>
  );
}
