import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { name as appName } from './app.json';
import App from './App';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function Main() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
