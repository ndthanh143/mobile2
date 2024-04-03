import {axiosInstance} from '../axios';

export const reviewApi = {
  createReview: async ({
    orderDetailId,
      message,
      star,
  }) => {
    const {data} = await axiosInstance.post('v1/review/create', {
      orderDetailId,
      message,
      star,
    });
    return data.data;
  },
  
  getUnratedProduct: async query  => {
    const {data} = await axiosInstance.get(
      `v1/review/get-unrated-product`, {
        params: {...query},
      });

    return data.data;
  },

  getReviewProduct: async id => {
    console.log('id',id);
    const {data} = await axiosInstance.get(
      `v1/review/get-by-product/${id}`,
    );

    return data.data.content;
  },

  starListReview: async id => {
    const {data} = await axiosInstance.get(
      `v1/review/star/count-for-each/${id}`,
    );

    return data.data.content;
  },

  getByProductPublic: async query => {
    console.log(query)
    const {data} = await axiosInstance.get(
      `v1/review/get-by-product-public`, {
        params: {...query}
      }
    );

    return data.data.content;
  },
};
