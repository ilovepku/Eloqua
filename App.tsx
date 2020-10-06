import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import TrackPlayer from 'react-native-track-player';
import tailwind from 'tailwind-rn';

import MainStackNavigator from './src/components/navigators/MainStackNavigator';
import client from './src/graphql/client';
import {PlayerContextProvider} from './src/contexts/PlayerContext';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // player lib setup IIFE
    (async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
        jumpInterval: 30,
      });
      setIsReady(true);
    })();
  }, []);

  return (
    <ApolloProvider client={client}>
      {isReady ? (
        <PlayerContextProvider>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </PlayerContextProvider>
      ) : (
        <View style={tailwind('flex-1 items-center justify-center')}>
          <ActivityIndicator />
        </View>
      )}
    </ApolloProvider>
  );
};

export default App;
