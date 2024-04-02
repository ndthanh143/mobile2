import {axiosInstance} from '../axios';

export const addressApi = {
  getAddressByUser: async () => {
    const {data} = await axiosInstance.get('v1/address/get-myAddress');

    return data.data;
  },
  createAddress: async payload => {
    const {address, districtId, name, phone, provinceId, wardId} = payload;

    const {data} = await axiosInstance.post('v1/address/create', {
      address,
      districtId,
      name,
      phone,
      provinceId,
      wardId,
    });

    return data;
  },
};
