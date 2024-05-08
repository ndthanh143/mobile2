import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {Center, Heading, Box, CheckIcon, Select, Stack} from 'native-base';
import {revenueService} from '../../../apis';
import {LineChart} from 'react-native-chart-kit';
import {EmptyData} from '../../../components';

const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);

export function Charts() {
  const [year, setYear] = useState(new Date().getFullYear());

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['revenue-months', year],
    queryFn: () => revenueService.getRevenueMonth({year}),
  });

  // Prepare the data for the chart
  const chartData = {
    labels: data?.map(item => `Tháng ${item.month + 1}`) || [], // Month starting from 1
    datasets: [
      {
        data: data?.map(item => (item.revenue / 1_000_000).toFixed(3)) || [],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  useEffect(() => {
    if (year) {
      refetch();
    }
  }, [year]);

  return (
    <Box>
      <Heading size="lg" mb="5">
        Biểu đồ doanh thu (triệu đồng)
      </Heading>

      <Stack style={{gap: 4}}>
        <Select
          selectedValue={year}
          defaultValue={year}
          width="100%"
          accessibilityLabel="Chọn năm"
          placeholder="Chọn năm"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setYear(itemValue)}>
          {years.map(item => (
            <Select.Item label={item} value={item} key={item} />
          ))}
        </Select>
        {isLoading ? (
          <Heading size="md">Loading...</Heading>
        ) : data ? (
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 100} // from react-native
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <EmptyData />
        )}
      </Stack>
    </Box>
  );
}
