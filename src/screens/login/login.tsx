import { View } from 'react-native';
import React from 'react';
import { Button } from 'native-base';
import useViewModel from './viewmodel';

function LoginScreen() {
  const { onLogin } = useViewModel();

  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}>
      <Button onPress={onLogin}>Login</Button>
    </View>
  );
}

export default LoginScreen;
