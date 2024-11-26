import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigation from './navigations/root-navigation';
import i18nextConfig from './locales';

export default function App() {
  const [ready, setReady] = useState(false);

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

  const init = async () => {
    await i18nextConfig.initalizeI18Next();
    setReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!ready) {
    return <></>;
  }
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
