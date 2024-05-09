import axios from 'axios';
import {API_URL, axiosInstance} from '../axios';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'v1/user';

export const myAddressApi = {
  getAddress: async () => {
    const token = await AsyncStorage.getItem('access_token');

    const {data} = await axiosInstance.get('v1/address/get-myAddress', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data.data;
  },
  getNation: async query => {
    const token = await AsyncStorage.getItem('access_token');

    const {data} = await axiosInstance.get('v1/nation/auto-complete', {
      params: {...query},
    });
    return data.data.content;
  },
  createAddress: async ({
    address,
    districtId,
    name,
    phone,
    provinceId,
    wardId,
  }) => {
    const {data} = await axiosInstance.post('/v1/address/create', {
      address,
      districtId,
      name,
      phone,
      provinceId,
      wardId,
    });
    return data.data;
  },
  updateAddress: async ({
    address,
    districtId,
    name,
    phone,
    provinceId,
    wardId,
    id,
  }) => {
    const {data} = await axiosInstance.put('/v1/address/update', {
      address,
      districtId,
      name,
      phone,
      provinceId,
      wardId,
      id,
    });
    return data.data;
  },
  deleteAddress: async id => {
    console.log('id ', id);
    return axiosInstance.delete(`/v1/address/delete/${id}`);
  },
};
