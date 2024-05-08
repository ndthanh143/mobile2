import {useQuery} from '@tanstack/react-query';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
} from 'native-base';
import {revenueService} from '../../../apis';
import {useEffect, useState} from 'react';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {LoadingOverlay} from '../../../components';
import {DEFAULT_FORMAT} from '../../../constants';

export function Statistic() {
  const [startDate, setStartDate] = useState(
    moment(new Date()).subtract(12, 'months').toDate(),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const {
    data: revenue,
    refetch: refetchRevenue,
    isFetching: isFetchingRevenue,
    isFetched: isFetchedRevenue,
  } = useQuery({
    queryKey: ['revenue'],
    queryFn: () =>
      revenueService.getRevenue({
        startDate: moment(startDate).format(DEFAULT_FORMAT),
        endDate: moment(endDate).format(DEFAULT_FORMAT),
      }),
  });

  useEffect(() => {
    if (startDate && endDate && isFetchedRevenue) {
      refetchRevenue();
    }
  }, [startDate, endDate]);

  console.log('revenue', revenue);
  return (
    <>
      <Stack style={{gap: 10}} width="100%">
        <Heading>Thống kê</Heading>
        <Flex direction="row" style={{gap: 10}}>
          <Box width="50%">
            <Text fontSize={14}>Từ ngày</Text>
            <Input
              width="100%"
              value={moment(startDate).format('DD/MM/YYYY')}
              InputRightElement={
                <Button
                  size="xs"
                  rounded="none"
                  w="1/3"
                  h="full"
                  onPress={() => setShowStartDatePicker(true)}>
                  Chọn
                </Button>
              }
            />
          </Box>
          <Box width="1/2">
            <Text fontSize={14}>Đến ngày</Text>
            <Input
              width="100%"
              value={moment(endDate).format('DD/MM/YYYY')}
              InputRightElement={
                <Button
                  size="xs"
                  rounded="none"
                  w="1/3"
                  h="full"
                  onPress={() => setShowEndDatePicker(true)}>
                  Chọn
                </Button>
              }
            />
          </Box>
        </Flex>

        <Flex
          alignItems="center"
          borderWidth={1}
          borderColor={'gray.300'}
          borderRadius={4}
          padding={4}>
          <Heading size="sm" fontWeight={400}>
            Revenues
          </Heading>
          <Heading size="lg" fontWeight={700} color="blue.500">
            {revenue?.revenue?.toLocaleString(3) || 0} VND
          </Heading>
        </Flex>
        <Flex style={{gap: 10}} direction="row">
          {/* <Grid container spacing={4}> */}
          {/* <Grid item xs={6}> */}
          <Flex
            flex={1}
            alignItems="center"
            borderWidth={1}
            borderColor={'gray.300'}
            borderRadius={4}
            width="100%"
            padding={4}>
            <Heading size="sm" fontWeight={400}>
              Orders
            </Heading>
            <Heading size="lg" fontWeight={700} color="blue.500">
              {revenue?.amount || 0}
            </Heading>
          </Flex>
          <Flex
            alignItems="center"
            borderWidth={1}
            borderColor={'gray.300'}
            borderRadius={4}
            flex={1}
            padding={4}>
            <Heading size="sm" fontWeight={400}>
              Users
            </Heading>
            <Heading size="lg" fontWeight={700} color="blue.500">
              {revenue?.amountUser || 0}
            </Heading>
          </Flex>
        </Flex>
        {/* </Grid> */}
        {/* // <Grid item xs={6}> */}

        {/* </Grid> */}
        {/* </Grid> */}
      </Stack>
      <LoadingOverlay loading={isFetchingRevenue} />

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            selectedDate && setStartDate(selectedDate);
            setShowStartDatePicker(false);
          }}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            selectedDate && setEndDate(selectedDate);
            setShowEndDatePicker(false);
          }}
        />
      )}
    </>
  );
}
