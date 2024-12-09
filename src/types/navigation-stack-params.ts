import {
  AuthScreens,
  DevtoolScreens,
  UnAuthScreens,
} from '../constants/screens';

export type AuthStackParamList = {
  [AuthScreens.HOME]: undefined;
};

export type UnAuthStackParamList = {
  [UnAuthScreens.LOGIN]: undefined;
  [UnAuthScreens.DEVTOOLS]: undefined;
};

export type DevToolsParamList = {
  [DevtoolScreens.FITBIT]: undefined;
};
