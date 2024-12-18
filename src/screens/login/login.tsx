import { View } from 'react-native';
import React from 'react';
import { Button } from 'native-base';
import { useTranslation } from 'react-i18next';
import useViewModel from './viewmodel';

function LoginScreen() {
  const { onLogin } = useViewModel();
  const { t } = useTranslation();

  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}>
      <Button onPress={onLogin}>{t('common.login')}</Button>
    </View>
  );
}

export default LoginScreen;
