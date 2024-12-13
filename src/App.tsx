/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';
import { Platform } from 'react-native';
import {
  initialize,
  readRecords,
  requestPermission,
} from 'react-native-health-connect';

import Config from 'react-native-config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StorageKey } from '@constants';
import NetworkDebugModal from './components/share/network-debug-modal/network-debug-modal';
import { initAPI } from './services/API';
import i18nextConfig from './locales';
import RootNavigation from './navigations/root-navigation';
import ErrorBoundary from './components/share/error-boundary.tsx/error-boundary';
import asyncStorage from './utils/async-storage';
import secureStorage from './utils/secure-storage';

export default function App() {
  const [ready, setReady] = useState(false);

  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.HeartRate],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  } as HealthKitPermissions;

  const initHealthKit = () => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log('ERROR Cannot grant permissions ', error);
      }

      const option = {
        startDate: new Date(2020, 1, 1).toISOString(),
      };

      AppleHealthKit.getHeartRateSamples(option, (err, results) => {
        console.log({ results });
      });
    });
  };

  const initHealthConnect = async () => {
    // initialize the client
    await initialize();

    // request permissions
    await requestPermission([
      { accessType: 'read', recordType: 'Steps' },
      {
        accessType: 'write',
        recordType: 'Steps',
      },
    ]);

    const result = await readRecords('Steps', {
      timeRangeFilter: {
        operator: 'between',
        startTime: '2024-01-01T12:00:00.405Z',
        endTime: '2024-10-16T23:53:15.405Z',
      },
    });

    console.log('Steps -> ', result.records);
  };

  const initHealth = async () => {
    if (Platform.OS === 'ios') {
      initHealthKit();
    } else {
      await initHealthConnect();
    }
  };

  useEffect(() => {
    initHealth();
  }, []);

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
  const handleFirstInitApp = async () => {
    const isFirstInitApp = await asyncStorage.getItem(
      StorageKey.IS_FIRST_INIT_APP
    );

    console.log({ isFirstInitApp });

    if (isFirstInitApp === false) return;

    secureStorage.clearStorage().then(() => {
      asyncStorage.setItem(StorageKey.IS_FIRST_INIT_APP, false);
    });
  };

  const init = async () => {
    initAPI(Config.API_URL);
    await i18nextConfig.initalizeI18Next();
    await handleFirstInitApp();
    setReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!ready) {
    return <></>;
  }

  const queryClient = new QueryClient();

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary>
          <GestureHandlerRootView>
            <NetworkDebugModal />
            <QueryClientProvider client={queryClient}>
              <RootNavigation />
            </QueryClientProvider>
          </GestureHandlerRootView>
        </ErrorBoundary>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
