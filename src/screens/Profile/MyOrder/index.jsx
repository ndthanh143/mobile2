import {
  View,
  ScrollView,
  Image,
  Text,
  Button,
  Avatar,
  Box,
  Center,
  Heading,
  VStack,
  Pressable,
  useColorModeValue,
  HStack,
  Spacer,
  FlatList,
} from 'native-base';
import {useEffect, useState} from 'react';
import {Animated, Dimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {orderApi} from '../../../apis/order';
import {useQuery} from '@tanstack/react-query';
import CardOrder from './cardOrder';

const MyOrderScreen = ({navigator}) => {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState(1);
  const {
    data: MyOrder,
    isLoading,
    refetch: refetchMyOrder,
  } = useQuery({
    queryKey: ['myOrders'],
    queryFn: () => orderApi.getMyOrder({state: state}),
  });
  useEffect(() => {
    refetchMyOrder({
      params: {state: state},
    });
  }, [state]);

  const FirstRoute = () => (
    <FlatList
      data={MyOrder}
      mt={5}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <CardOrder data={item} />}
    />
  );

  const SecondRoute = () => (
    <Center flex={1} my="4">
      This is Tab 2
    </Center>
  );

  const ThirdRoute = () => (
    <Center flex={1} my="4">
      This is Tab 3
    </Center>
  );

  const FourthRoute = () => (
    <Center flex={1} my="4">
      This is Tab 4{' '}
    </Center>
  );

  const initialLayout = {
    width: Dimensions.get('window').width,
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: FirstRoute,
    third: FirstRoute,
    fourth: FourthRoute,
  });
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
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const color =
            index === i
              ? useColorModeValue('#000', '#e5e5e5')
              : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor =
            index === i
              ? 'cyan.500'
              : useColorModeValue('coolGray.200', 'gray.400');
          if (i === 0) {
            setState(1);
          } else if (i === 1) {
            setState(3);
          } else {
            setState(4);
          }
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer">
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text
                  style={{
                    color,
                  }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
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
      initialLayout={initialLayout}
    />
  );
};

export default MyOrderScreen;
