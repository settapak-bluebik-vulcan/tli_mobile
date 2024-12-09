import { View, Text } from 'react-native';
import React from 'react';
import useViewModel from './viewmodel';
import { Button } from 'native-base';

const FitbitDevTool = () => {
  const { onPressConnectFitbit, onPressRevoke, fitbitAccessToken } =
    useViewModel();
  return (
    <View>
      <View style={{ display: 'flex', gap: 10 }}>
        <Text>fitbitAccessToken : {fitbitAccessToken}</Text>
        <Button
          variant="primary"
          color="blue.200"
          onPress={() => onPressConnectFitbit()}>
          Connect fitbit
        </Button>
        <Button
          variant="primary"
          color="blue.200"
          onPress={() => onPressRevoke()}>
          unlink fitbit
        </Button>
      </View>
    </View>
  );
};

export default FitbitDevTool;
