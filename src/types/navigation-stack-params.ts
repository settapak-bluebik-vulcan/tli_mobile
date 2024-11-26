import { AuthScreens, UnAuthScreens } from '../constants/screens';

export type AuthStackParamList = {
  [AuthScreens.HOME]: undefined;
};

export type UnAuthStackParamList = {
  [UnAuthScreens.LOGIN]: undefined;
  [UnAuthScreens.DEVTOOLS]: undefined;
};
