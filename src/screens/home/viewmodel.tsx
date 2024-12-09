import { UnAuthScreens } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore, fitbitAuthStore } from '@stores';
import { RootStackParamList } from 'src/navigations/root-navigation';
import { authorize, refresh, revoke, logout } from 'react-native-app-auth';
import Config from 'react-native-config';

const useViewModel = () => {
  const { removeTokens, accessToken, refreshToken } = useAuthStore();



  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPressDevtools = () => {
    navigation.navigate(UnAuthScreens.DEVTOOLS);
  };

  return {
    onPressDevtools,
    removeTokens,
    accessToken,
    refreshToken,
  };
};

export default useViewModel;
