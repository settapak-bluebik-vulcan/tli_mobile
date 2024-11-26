/* eslint-disable import/no-cycle */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthStackParamList, UnAuthStackParamList } from '@types';
import { UnAuthScreens } from '@constants';
import AuthStack from './auth-stack';
import { useAuthStore } from '@stores';
import UnAuthStack from './un-auth-stack';
import DevToolsScreen from '../screens/devtools/devtools-screen';

export type RootStackParamList = AuthStackParamList & UnAuthStackParamList;

export const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  const authStore = useAuthStore();

  console.log(authStore.accessToken);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          {authStore?.accessToken ? AuthStack() : UnAuthStack()}

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
