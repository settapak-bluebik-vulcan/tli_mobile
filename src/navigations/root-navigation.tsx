/* eslint-disable import/no-cycle */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  AuthStackParamList,
  DevToolsParamList,
  UnAuthStackParamList,
} from '@types';
import { DevtoolScreens, UnAuthScreens } from '@constants';
import { useAuthStore } from '@stores';
import AuthStack from './auth-stack';
import UnAuthStack from './un-auth-stack';
import DevToolsScreen from '../screens/devtools/devtools-screen';
import FitbitDevTool from '../screens/devtools/fitbit/fitbit-devtool';

export type RootStackParamList = AuthStackParamList &
  UnAuthStackParamList &
  DevToolsParamList;

export const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  const authStore = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          {authStore?.accessToken ? AuthStack() : UnAuthStack()}

          <Stack.Screen
            name={UnAuthScreens.DEVTOOLS}
            component={DevToolsScreen}
          />
          <Stack.Screen
            name={DevtoolScreens.FITBIT}
            component={FitbitDevTool}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
