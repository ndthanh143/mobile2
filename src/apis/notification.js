import {axiosInstance} from '../axios';

export const notificationApi = {
  getMyNoti: async () => {
    const {data} = await axiosInstance.get('v1/notification/my-notification');

    return data.data;
  },
};
