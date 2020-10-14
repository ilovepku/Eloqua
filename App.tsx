import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {
  setupPlayer,
  updateOptions,
  CAPABILITY_PLAY,
  CAPABILITY_PAUSE,
  CAPABILITY_JUMP_FORWARD,
  CAPABILITY_JUMP_BACKWARD,
  CAPABILITY_SKIP_TO_PREVIOUS,
  CAPABILITY_SKIP_TO_NEXT,
  CAPABILITY_SEEK_TO,
} from 'react-native-track-player';

import {store, persistor} from './src/redux/store';
import client from './src/graphql/client';
import {PlayerContextProvider} from './src/contexts/PlayerContext';
import MainStackNavigator from './src/components/navigators/MainStackNavigator';
import LoadingIndicator from './src/components/loadingIndicator/LoadingIndicator';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // player lib setup IIFE
    (async () => {
      await setupPlayer();
      await updateOptions({
        stopWithApp: true,
        capabilities: [
          CAPABILITY_PLAY,
          CAPABILITY_PAUSE,
          CAPABILITY_JUMP_BACKWARD,
          CAPABILITY_JUMP_FORWARD,
          CAPABILITY_SKIP_TO_PREVIOUS,
          CAPABILITY_SKIP_TO_NEXT,
          CAPABILITY_SEEK_TO,
        ],
        compactCapabilities: [
          CAPABILITY_PLAY,
          CAPABILITY_PAUSE,
          CAPABILITY_JUMP_BACKWARD,
          CAPABILITY_SKIP_TO_NEXT,
        ],
        jumpInterval: 30,
      });
      setIsReady(true);
    })();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
        <ApolloProvider client={client}>
          {isReady ? (
            <PlayerContextProvider>
              <NavigationContainer>
                <MainStackNavigator />
              </NavigationContainer>
            </PlayerContextProvider>
          ) : (
            <LoadingIndicator />
          )}
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
