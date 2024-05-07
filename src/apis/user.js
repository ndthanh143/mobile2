import axios from 'axios';
import {API_URL, axiosInstance} from '../axios';
import {Buffer} from 'buffer';

const BASE_URL = 'v1/user';

export const userApi = {
  signUp: async payload => {
    window.Buffer = window.Buffer || Buffer;
    const base64Credentials =
      Buffer.from(`abc_client:abc123`).toString('base64');

    console.log('payload', payload);
    try {
      const {data} = await axiosInstance.post(`v1/user/signup`, payload, {
        headers: {
          // Add your headers here
          Authorization: 'Basic ' + base64Credentials,
          // You can add other headers like authorization token if needed
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  confirmOtp: async payload => {
    window.Buffer = window.Buffer || Buffer;
    console.log('otp', payload);
    try {
      const {data} = await axiosInstance.post(`v1/user/confirm_otp`, payload);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  updateProfile: async payload => {
    window.Buffer = window.Buffer || Buffer;
    console.log('updateProfile', payload);
    try {
      const {data} = await axiosInstance.put(`v1/user/update-profile`, payload);
      return data;
    } catch (err) {
      console.log("update Profile error",err);
    }
  },
};
