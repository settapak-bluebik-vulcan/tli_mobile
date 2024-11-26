/* eslint-disable import/no-cycle */
import React from 'react';
import { AuthScreens } from '@constants';
import HomeScreen from '../screens/home/home-screen';
import { Stack } from './root-navigation';

function AuthStack() {
  return <Stack.Screen name={AuthScreens.HOME} component={HomeScreen} />;
}
export default AuthStack;
