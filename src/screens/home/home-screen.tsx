import { Text } from 'react-native';
import React from 'react';
import { Button, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import useViewModel from './viewmodel';
import { useAuthStore } from '@stores';
import { useTranslation } from 'react-i18next';

function HomeScreen() {
  const { onPressDevtools, removeTokens, accessToken, refreshToken } =
    useViewModel();

  const { t } = useTranslation();

  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        gap: 10,
      }}>
      <Text>accessToken : {accessToken} </Text>
      <Text>refreshToken : {refreshToken} </Text>

      <Button onPress={removeTokens}>{t('common.logout')}</Button>

      <Button
        variant="primary"
        color="blue.200"
        onPress={() => onPressDevtools()}>
        Devtool
      </Button>
    </View>
  );
}

export default HomeScreen;
