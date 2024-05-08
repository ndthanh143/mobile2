import {axiosInstance} from '../axios';

export const orderApi = {
  createOrder: async ({
    receiver,
    email,
    addressId,
    phone,
    paymentMethod,
    listOrderProduct,
  }) => {
    const {data} = await axiosInstance.post('v1/order/create-for-user', {
      receiver,
      email,
      addressId,
      phone,
      paymentMethod,
      listOrderProduct,
    });

    return data.data;
  },
  getMyOrder: async query => {
    const {data} = await axiosInstance.get('v1/order/my-order', {
      params: {...query},
    });

    return data.data.content || [];
  },

  getOrderProducts: async id => {
    const {data} = await axiosInstance.get(
      `v1/order-detail/get-by-order/${id}`,
    );

    return data.data.content;
  },
  getListOrder: async query => {
    const {data} = await axiosInstance.get('v1/order/list', {
      params: {...query},
    });

    return data.data;
  },
  updateOrder: async payload => {
    console.log('payload', payload);
    const {data} = await axiosInstance.put(`v1/order/update`, payload);

    console.log('data', data);

    return data;
  },
  getOrder: async id => {
    const {data} = await axiosInstance.get(`v1/order/get/${id}`);

    return data.data;
  },
};
