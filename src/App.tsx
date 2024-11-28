import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigation from './navigations/root-navigation';
import i18nextConfig from './locales';

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import { Platform } from 'react-native';
import {
  initialize,
  readRecords,
  requestPermission,
} from 'react-native-health-connect';

import Config from 'react-native-config';
import NetworkDebugModal from './components/share/network-debug-modal/network-debug-modal';

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

  useEffect(() => {
    if (Platform.OS === 'ios') {
      initHealthKit();
    } else {
      initHealthConnect();
    }
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
          <NetworkDebugModal />
          <RootNavigation />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
