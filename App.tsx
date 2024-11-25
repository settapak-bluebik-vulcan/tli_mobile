import React from 'react';
import {
  NativeBaseProvider,
  Text,
  Box,
  extendTheme,
  Button,
} from 'native-base';

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
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
        <Button variant="primary" color="blue.200">
          Hello
        </Button>
      </Box>
    </NativeBaseProvider>
  );
}
