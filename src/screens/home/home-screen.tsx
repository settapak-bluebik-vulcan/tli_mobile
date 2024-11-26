import { Text } from 'react-native';
import React from 'react';
import { Button, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import useViewModel from './viewmodel';
import { useAuthStore } from '@stores';

function HomeScreen() {
  const { onPressDevtools, removeTokens } = useViewModel();

  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        gap: 10,
      }}>
      <Button onPress={removeTokens}>Logout</Button>

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
