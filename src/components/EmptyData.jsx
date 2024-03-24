import {Box, Text} from 'native-base';

export const EmptyData = ({message = 'No data available'}) => {
  return (
    <Box alignContent="center" justifyContent="center" padding="4">
      <Text textAlign="center" color="muted.500">
        {message}
      </Text>
    </Box>
  );
};
