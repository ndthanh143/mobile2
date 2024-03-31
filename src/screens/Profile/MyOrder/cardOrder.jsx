import {Box, Button, Center, HStack, Text, VStack} from 'native-base';
import {convertUtcToLocalTime, formatMoney} from '../../../utils';
import {DATE_FORMAT_VALUE, DEFAULT_FORMAT} from '../../../constants';

const CardOrder = ({data, colorCard}) => {
  // console.log(colorCard);
  return (
    <Center flex={1} my="2">
      <Box
        borderWidth="0.5"
        borderRadius={'xl'}
        _dark={{
          borderColor: 'muted.50',
        }}
        borderColor="muted.800"
        pl={'10px'}
        pr={'10px'}
        py="2"
        px="5"
        w={'90%'}>
        <VStack>
          <HStack
            space={[2, 3]}
            justifyContent="space-between"
            alignItems="center">
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              bold
              fontSize="xl">
              Đơn hàng #31
            </Text>
            <Text>
              {convertUtcToLocalTime(
                data?.createdDate,
                DEFAULT_FORMAT,
                DATE_FORMAT_VALUE,
              )}
            </Text>
          </HStack>
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            fontSize="md">
            Mã vận đơn: #{data.orderCode}
          </Text>
          <HStack
            space={[2, 3]}
            justifyContent="space-between"
            alignItems="center">
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              fontSize="md">
              Số lượng: 1
            </Text>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              fontSize="md">
              Tổng:{' '}
              {formatMoney(data?.totalMoney, {
                groupSeparator: ',',
                decimalSeparator: '.',
                currentcy: 'đ',
                currentcyPosition: 'BACK',
                currentDecimal: '0',
              })}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" pt={'5px'}>
            <Button
              borderRadius={'10px'}
              variant="outline"
              _text={{fontSize: 'md'}}>
              Xem chi tiết
            </Button>
            <Text
              fontSize={'sm'}
              bold
              color={colorCard.color}
              _dark={{
                color: 'green',
              }}>
              {colorCard.text}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default CardOrder;
