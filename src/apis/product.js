import {axiosInstance} from '../axios';

export const productApi = {
  getProducts: async () => {
    const {data} = await axiosInstance.get('v1/product/auto-complete');

    return data.data;
  },
};
