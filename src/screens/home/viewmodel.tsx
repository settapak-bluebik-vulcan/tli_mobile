import { UnAuthScreens } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore, fitbitAuthStore } from '@stores';
import { RootStackParamList } from 'src/navigations/root-navigation';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import Config from 'react-native-config';

const useViewModel = () => {
  const { removeTokens, accessToken, refreshToken } = useAuthStore();

  const { setTokens, fitbitAccessToken, fitbitRefreshToken } =
    fitbitAuthStore();

  const config = {
    clientId: Config.FITBIT_CLIENT_ID ?? '',
    clientSecret: Config.FITBIT_CLIENT_SECRET ?? '',
    redirectUrl: Config.FITBIT_REDIRECT_URL ?? '', //note: path is required
    scopes: ['activity', 'sleep', 'profile', 'weight', 'heartrate'],
    serviceConfiguration: {
      authorizationEndpoint: Config.FITBIT_AUTHORIZATION_ENDPOINT ?? '',
      tokenEndpoint: Config.FITBIT_TOKEN_ENDPOINT ?? '',
      revocationEndpoint: Config.FITBIT_REVOCATION_ENDPOINT,
    },
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPressDevtools = () => {
    navigation.navigate(UnAuthScreens.DEVTOOLS);
  };

  const onPressConnectFitbit = async () => {
    console.log('Config -> ', config);
    try {
      if (fitbitRefreshToken != null && fitbitRefreshToken != '') {
        const refreshedState = await refresh(config, {
          refreshToken: fitbitRefreshToken,
        });
        console.log('Refresh state:', refreshedState);
        setTokens({
          fitbitAccessToken: refreshedState.accessToken,
          fitbitRefreshToken: refreshedState.refreshToken,
        });
      } else {
        const authState = await authorize(config);
        console.log('Auth state:', authState);
        setTokens({
          fitbitAccessToken: authState.accessToken,
          fitbitRefreshToken: authState.refreshToken,
        });
      }
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };

  return {
    onPressDevtools,
    onPressConnectFitbit,
    removeTokens,
    accessToken,
    refreshToken,
  };
};

export default useViewModel;
