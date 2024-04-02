import {axiosInstance} from '../axios';

export const transaction = {
  createTransaction: async ({orderId, urlCancel, urlSuccess}) => {
    const {data} = await axiosInstance.post('v1/transaction/create', {
      orderId,
      urlCancel,
      urlSuccess,
    });

    return data.data;
  },
};
