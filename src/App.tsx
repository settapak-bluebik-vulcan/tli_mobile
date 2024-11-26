import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigation from './navigations/root-navigation';

export default function App() {
  const theme = extendTheme({
    components: {
      Button: {
        variants: {
          primary: {
            bg: '#FC8C0C',
            _text: {
              color: 'white',
            } as React.CSSProperties,
          },
        },

        baseStyle: {
          rounded: 'md',
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView>
          <RootNavigation />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
