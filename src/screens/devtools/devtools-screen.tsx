import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { DevtoolScreens } from '@constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigations/root-navigation';

function DevToolsScreen() {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>DevToolsScreen</Text>

      <Button
        onPress={() => {
          navigate.navigate(DevtoolScreens.FITBIT);
        }}>
        Fitbitd
      </Button>
    </View>
  );
}

export default DevToolsScreen;
