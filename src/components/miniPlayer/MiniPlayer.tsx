import React from 'react'
import {TouchableOpacity, View, Image, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {STATE_PLAYING, STATE_BUFFERING} from 'react-native-track-player'
import tailwind from 'tailwind-rn'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {usePlayerContext} from '../../contexts/PlayerContext'

export default function MiniPlayer() {
  const {
    currentTrack,
    playbackState,
    togglePlayback,
    skipNext,
  } = usePlayerContext()
  const navigation = useNavigation()

  const navigateToPlayer = () => {
    navigation.navigate('Player')
  }

  return !currentTrack ? null : (
    <TouchableOpacity onPress={navigateToPlayer}>
      <View
        style={tailwind(
          'h-16 mx-2 border-t border-gray-300 flex-row items-center',
        )}
      >
        <Image
          source={{uri: currentTrack.artwork}}
          style={tailwind('h-12 w-12 mr-2 rounded-lg')}
        />
        <Text
          numberOfLines={1}
          style={tailwind('flex-1 mr-2 text-lg font-bold')}
        >
          {currentTrack.title}
        </Text>

        <TouchableOpacity onPress={togglePlayback} style={tailwind('mr-2')}>
          <MaterialIcons
            size={30}
            name={
              playbackState === STATE_PLAYING ||
              playbackState === STATE_BUFFERING
                ? 'pause'
                : 'play-arrow'
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipNext} style={tailwind('mr-2')}>
          <MaterialIcons size={30} name="skip-next" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}
