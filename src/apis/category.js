import {axiosInstance} from '../axios';

export const categoryService = {
  getAll: async () => {
    const {data} = await axiosInstance.get('v1/category/auto-complete');

    return data.data;
  },
};
