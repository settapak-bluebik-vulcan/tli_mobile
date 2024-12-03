declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    API_URL?: string;
    APP_NAME?: string;
    FITBIT_CLIENT_ID?: string;
    FITBIT_CLIENT_SECRET?: string;
    FITBIT_REDIRECT_URL?: string;
    FITBIT_AUTHORIZATION_ENDPOINT?: string;
    FITBIT_TOKEN_ENDPOINT?: string;
    FITBIT_REVOCATION_ENDPOINT?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
