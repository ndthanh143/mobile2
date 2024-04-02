import {Flex, Spinner} from 'native-base';

export function LoadingContainer() {
  return (
    <Flex
      bgColor="white"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center">
      <Spinner size="large" color="#0000ff" />
    </Flex>
  );
}
