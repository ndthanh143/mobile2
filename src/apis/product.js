import {axiosInstance} from '../axios';

export const productApi = {
  getProducts: async query => {
    const {data} = await axiosInstance.get('v1/product/auto-complete', {
      params: {...query},
    });

    return data.data || [];
  },
  getDetail: async (id) => {
    const { data } = await axiosInstance.get(`v1/product/get-autoComplete/${id}`);
  
    return data.data;
  },
};
