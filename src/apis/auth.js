import {axiosInstance} from '../axios';

export const authApi = {
  signIn: async payload => {
    const {data} = await axiosInstance.post('/api/token', payload);

    return data;
  },
};
