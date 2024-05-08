import {axiosInstance} from '../axios';

export const revenueService = {
  getRevenue: async query => {
    console.log('query', query);
    const {data} = await axiosInstance('v1/revenue/get-revenue', {
      params: query,
    });

    return data.data;
  },
  getRevenueMonth: async query => {
    const {data} = await axiosInstance('v1/revenue/get-revenue-month', {
      params: query,
    });

    return data.data;
  },
};
