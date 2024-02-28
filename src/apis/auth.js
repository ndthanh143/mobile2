import {axiosInstance} from '../axios';
import {Buffer} from 'buffer';

export const authApi = {
  signIn: async ({phone, password, grant_type = 'user'}) => {
    window.Buffer = window.Buffer || Buffer;
    const base64Credentials =
      Buffer.from(`abc_client:abc123`).toString('base64');

    console.log('base64Credentials', base64Credentials);
    try {
      const {data} = await axiosInstance.post(
        'api/token',
        {
          phone,
          password,
          grant_type,
        },
        {
          headers: {
            // Add your headers here
            Authorization: 'Basic ' + base64Credentials,
            // You can add other headers like authorization token if needed
          },
        },
      );
      return data;
    } catch (error) {
      console.log(error);
    }

    console.log('data', data);
  },
};
