/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {Center, extendTheme, NativeBaseProvider, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import MainNavigation from './src/routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SetupService} from './src/services';

const queryClient = new QueryClient();

const config = {
  useSystemColorMode: true,
};

const customTheme = extendTheme({config});

const App = () => {
  // const track = useCurrentTrack();
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    async function run() {
      const isSetup = await SetupService();
      setIsPlayerReady(isSetup);
    }
    run();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          {isPlayerReady ? (
            <MainNavigation />
          ) : (
            <Center flex={1}>
              <Spinner size="lg" />
            </Center>
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
