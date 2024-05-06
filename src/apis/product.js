import {axiosInstance} from '../axios';

export const productApi = {
  getProducts: async query => {
    const {data} = await axiosInstance.get('v1/product/auto-complete', {
      params: {...query},
    });

    return data.data || [];
  },
  getProductList: async query => {
    const {data} = await axiosInstance.get('v1/product/list', {
      params: {...query},
    });

    return data.data;
  },
  getProductTop10: async () => {
    const {data} = await axiosInstance.get('v1/product/get-product-top10');

    return data.data || [];
  },
  getDetail: async id => {
    const {data} = await axiosInstance.get(`v1/product/get-autoComplete/${id}`);

    return data.data;
  },

  getRelatedProduct: async (id, query) => {
    const {data} = await axiosInstance.get(`v1/product/get-product-related/${id}`, {
      params: {...query},
    });

    return data.data;
  },
};
