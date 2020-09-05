import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import TrackPlayer from "react-native-track-player"
import tailwind from 'tailwind-rn';

import MainStackNavigator from './src/components/navigators/MainStackNavigator';
import client from './src/graphql/client';
import trackPlayerServices from './src/services/trackPlayerServices';
import { PlayerContextProvider } from './src/contexts/PlayerContext';

const track = {
  id: '1',
  url:
    'https://cdn.simplecast.com/audio/05bd32/05bd32de-6cd4-40f6-b3bd-0bdf6750dd58/9b70bc7c-6bcc-48e7-8265-90089d7a1ed3/141_tc.mp3?aid=rss_feed',
  title: '141: Jason Fried - Running the Tailwind Business on Basecamp',
  artist: 'Full Stack Radio',
}

const App = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log("player set up")
      TrackPlayer.registerPlaybackService(() => trackPlayerServices);
      setIsReady(true)
    })
  }, [])

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
