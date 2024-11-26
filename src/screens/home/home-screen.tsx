import { Text } from 'react-native';
import React from 'react';
import { Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import useViewModel from './viewmodel';

function HomeScreen() {
  const { onPressDevtools } = useViewModel();

  return (
    <SafeAreaView>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        variant="primary"
        color="blue.200"
        onPress={() => onPressDevtools()}>
        Devtool
      </Button>
    </SafeAreaView>
  );
}

export default HomeScreen;
