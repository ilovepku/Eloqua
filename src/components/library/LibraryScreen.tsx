import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import tailwind from 'tailwind-rn';

import {DBContext} from '../../contexts/DBContext';

const LibraryScreen = () => {
  const dbContext = useContext(DBContext);

  return (
    <View style={tailwind('flex-1')}>
      {dbContext.podcasts.map((podcast) => (
        <View key={podcast.feedUrl} style={tailwind('mb-4 p-4 bg-white')}>
          <Text>{podcast.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default LibraryScreen;
