import {Avatar, Flex, Heading, Stack} from 'native-base';
import {useAuth} from '../../../hooks';

export function Header() {
  const {profile} = useAuth();

  return (
    profile && (
      <Flex direction="row" style={{gap: 10}} alignItems="center">
        <Avatar source={{uri: profile.avatar}} bgColor="primary.500">
          {profile.fullName.charAt(0).toUpperCase()}
        </Avatar>
        <Stack>
          <Heading size="sm" color="coolGray.500" fontWeight={400}>
            Hello
          </Heading>
          <Heading
            size="lg"
            fontWeight="700"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            {profile.fullName}
          </Heading>
        </Stack>
      </Flex>
    )
  );
}
