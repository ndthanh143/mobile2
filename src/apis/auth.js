import {API_URL, axiosInstance} from '../axios';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const authApi = {
  signIn: async ({phone, password, grant_type = 'user'}) => {
    window.Buffer = window.Buffer || Buffer;
    const base64Credentials =
      Buffer.from(`abc_client:abc123`).toString('base64');

    console.log(phone, password, grant_type);

    const {data} = await axios.post(
      `${API_URL}/api/token`,
      {
        phone,
        password,
        grant_type,
      },
      {
        headers: {
          Authorization: 'Basic ' + base64Credentials,
        },
      },
    );

    await AsyncStorage.setItem('access_token', data.access_token);

    return data;
  },
  requestForgotPassword: async payload => {
    const {data} = await axiosInstance.post(
      'v1/account/request_forget_password',
      payload,
    );
    return data;
  },
  confirmOtpForgetPassword: async payload => {
    try {
      const {data} = await axiosInstance.post(
        'v1/account/forget_password',
        payload,
      );

      console.log('data', data);

      return data;
    } catch (err) {
      console.log(err);
    }
  },
  getProfile: async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');

      const {data} = await axiosInstance.get('v1/account/profile', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      return data.data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};
