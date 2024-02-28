import {axiosInstance} from '../axios';

const BASE_URL = '/v1/user';

export const userApi = {
  signUp: async data => {
    await axiosInstance.post(`${BASE_URL}/signup`, data);
  },
};
