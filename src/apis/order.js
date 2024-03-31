import {axiosInstance} from '../axios';

export const orderApi = { 
    getMyOrder: async query => {
      console.log("query",query);
        const {data} = await axiosInstance.get('v1/order/my-order', {
          params: {...query},
        });
    
        return data.data.content || [];
      },
};