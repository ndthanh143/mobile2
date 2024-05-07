import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect, useState} from 'react';
import {authApi} from '../apis';

export const useAuth = () => {
  const [accessToken, setToken] = useState();

  const getToken = async () => {
    const token = await AsyncStorage.getItem('access_token');

    if (token) {
      setToken(token);
    }
  };

  const removeToken = async () => await AsyncStorage.removeItem('access_token');

  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authApi.getProfile(),
    enabled: Boolean(accessToken),
    staleTime: Infinity,
  });

  const {
    mutate: login,
    isError: isLoginError,
    isPending: isLoginLoading,
  } = useMutation({
    mutationFn: payload => authApi.signIn(payload),
    onSuccess: () => {
      getToken();
    },
    onError: (error) => {
      console.log("login",error);
    },
  });

  const logout = async () => {
    queryClient.setQueryData(['profile'], null);
    await removeToken();
    setToken(null);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (Boolean(accessToken)) {
      refetch();
    }
  }, [accessToken]);

  return {
    profile,
    isLoading,
    refetch,
    isLoginLoading,
    isFetched,
    login,
    isLoginError,
    logout,
  };
};
