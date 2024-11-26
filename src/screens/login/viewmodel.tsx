import { View, Text } from 'react-native';
import React from 'react';
import { useAuthStore } from '@stores';

const useViewModel = () => {
  const { setTokens } = useAuthStore();

  const onLogin = () => {
    setTokens({
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken',
    });
  };

  return { onLogin };
};

export default useViewModel;
