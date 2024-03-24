import {axiosInstance} from '../axios';

export const productApi = {
  getProducts: async query => {
    const {data} = await axiosInstance.get('v1/product/auto-complete', {
      params: {...query},
    });

    return data.data || [];
  },
};
