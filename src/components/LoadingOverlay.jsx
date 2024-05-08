import {Box, Center, Spinner} from 'native-base';

export function LoadingOverlay({loading}) {
  return (
    loading && (
      <Center
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        height="100vh"
        bg="rgba(0, 0, 0, 0.25)" // Using `bg` for background shorthand.
        zIndex={9999} // Ensure it's above all other content.
      >
        <Spinner size="lg" color="primary.500" />
      </Center>
    )
  );
}
