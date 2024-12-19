import Config from 'react-native-config';
import { useFitbitAuthStore } from '@stores';
import { authorize, refresh, revoke } from 'react-native-app-auth';

const useViewModel = () => {
  const config = {
    clientId: Config.FITBIT_CLIENT_ID ?? '',
    clientSecret: Config.FITBIT_CLIENT_SECRET ?? '',
    redirectUrl: Config.FITBIT_REDIRECT_URL ?? '', // note: path is required
    scopes: ['activity', 'sleep', 'profile', 'weight', 'heartrate'],
    serviceConfiguration: {
      authorizationEndpoint: Config.FITBIT_AUTHORIZATION_ENDPOINT ?? '',
      tokenEndpoint: Config.FITBIT_TOKEN_ENDPOINT ?? '',
      revocationEndpoint: Config.FITBIT_REVOCATION_ENDPOINT,
    },
  };

  const { setTokens, fitbitAccessToken, fitbitRefreshToken, removeTokens } =
    useFitbitAuthStore();

  const onPressConnectFitbit = async () => {
    console.log('Config -> ', config);
    try {
      if (fitbitRefreshToken != null && fitbitRefreshToken !== '') {
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

  const onPressRevoke = async () => {
    if (fitbitRefreshToken) {
      await revoke(config, {
        tokenToRevoke: fitbitRefreshToken,
        includeBasicAuth: true,
      });

      removeTokens();
    }
  };

  return { onPressConnectFitbit, onPressRevoke, fitbitAccessToken };
};

export default useViewModel;
