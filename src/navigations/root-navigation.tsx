/* eslint-disable import/no-cycle */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthStackParamList, UnAuthStackParamList } from '@types';
import { UnAuthScreens } from '@constants';
import DevToolsScreen from 'src/screens/devtools/devtools-screen';
import AuthStack from './auth-stack';

export type RootStackParamList = AuthStackParamList & UnAuthStackParamList;

export const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          {AuthStack()}

          <Stack.Screen
            name={UnAuthScreens.DEVTOOLS}
            component={DevToolsScreen}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
