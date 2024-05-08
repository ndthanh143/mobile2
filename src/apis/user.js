import {axiosInstance} from '../axios';
import {Buffer} from 'buffer';

export const userApi = {
  signUp: async payload => {
    window.Buffer = window.Buffer || Buffer;
    const base64Credentials =
      Buffer.from(`abc_client:abc123`).toString('base64');

    const {data} = await axiosInstance.post(`v1/user/signup`, payload, {
      headers: {
        // Add your headers here
        Authorization: 'Basic ' + base64Credentials,
        'Content-Type': 'application/json',
        // You can add other headers like authorization token if needed
      },
    });
    return data;
  },

  confirmOtp: async payload => {
    window.Buffer = window.Buffer || Buffer;
    const {data} = await axiosInstance.post(`v1/user/confirm_otp`, payload);
    return data;
  },

  updateProfile: async payload => {
    window.Buffer = window.Buffer || Buffer;
    const {data} = await axiosInstance.put(`v1/user/update-profile`, payload);
    return data;
  },
};
