import {Button, Box, useColorModeValue, FlatList, Spinner} from 'native-base';
import {useEffect, useState} from 'react';
import {TabView} from 'react-native-tab-view';
import {orderApi} from '../../../apis/order';
import {useQuery} from '@tanstack/react-query';
import CardOrder from './cardOrder';

const Spiner = () => {
  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={10}
      height="100vh">
      <Spinner color="red.500" size="lg" />
    </Box>
  );
};

const MyOrderScreen = () => {
  const [index, setIndex] = useState(0);
  const tabStates = {
    0: 1,
    1: 4,
    2: 3,
  };
  const colorCard = {
    0: {text: 'Đang xử lý', color: 'yellow.500', orderState: 1},
    1: {text: 'Đã giao hàng', color: 'green.500', orderState: 4},
    2: {text: 'Đã hủy', color: 'red.700', orderState: 3},
  };
  const {
    data: MyOrder,
    isFetching,
    isFetched,
    refetch: refetchMyOrder,
  } = useQuery({
    queryKey: ['myOrders'],
    queryFn: () => orderApi.getMyOrder({state: tabStates[index]}),
  });

  useEffect(() => {
    if (isFetched) {
      refetchMyOrder();
    }
  }, [index]);

  const DataRoute = () => {
    return (
      <FlatList
        data={MyOrder}
        mt={5}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CardOrder data={item} colorCard={colorCard[index]} />
        )}
      />
    );
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
      case 'second':
      case 'third':
        return isFetching ? <Spiner /> : <DataRoute />;
      default:
        return null;
    }
  };
  const [routes] = useState([
    {
      key: 'first',
      title: 'Đang xử lý',
    },
    {
      key: 'second',
      title: 'Đã giao',
    },
    {
      key: 'third',
      title: 'Đã hủy',
    },
  ]);

  const renderTabBar = props => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          // const opacity = props.position.interpolate({
          //   inputRange,
          //   outputRange: inputRange.map(inputIndex =>
          //     inputIndex === i ? 1 : 0.5,
          //   ),
          // });
          const color =
            index === i
              ? useColorModeValue('#000', '#e5e5e5')
              : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor =
            index === i
              ? 'red.500'
              : useColorModeValue('coolGray.200', 'gray.400');
          const textColor = index === i ? 'white.400' : 'black.500';
          return (
            <Box
              // borderBottomWidth="3"
              // bg={borderColor}
              flex={1}
              alignItems="center"
              p="3">
              <Button
                onPress={() => {
                  setIndex(i);
                }}
                bg={borderColor}
                borderRadius={'3xl'}
                w={'110px'}
                _text={{color: index === i ? 'white' : 'black'}}>
                {route.title}
              </Button>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
    />
  );
};

export default MyOrderScreen;
