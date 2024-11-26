/* eslint-disable import/no-cycle */
import React from 'react';
import { UnAuthScreens } from '@constants';
import LoginScreen from 'src/screens/login/login';
import { Stack } from './root-navigation';

function UnAuthStack() {
  return <Stack.Screen name={UnAuthScreens.LOGIN} component={LoginScreen} />;
}
export default UnAuthStack;
