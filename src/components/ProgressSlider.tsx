import React from 'react'
import {View, Text} from 'react-native'
import {useSelector} from 'react-redux'
import Slider from '@react-native-community/slider'
import tailwind from 'tailwind-rn'

import {RootState} from '../redux/rootReducer'
import {usePlayerContext} from '../contexts/PlayerContext'
import {buildTime} from '../utils/dateTimeHelper'

const ProgressSlider: React.FC = () => {
  const {duration, seek} = usePlayerContext()
  const {
    player: {savedPosition},
  } = useSelector((state: RootState) => state)

  const totalTime = (): string => buildTime(duration - savedPosition)

  const currentTime = (): string => buildTime(savedPosition)

  return (
    <>
      <Slider
        style={tailwind('w-full h-12')}
        minimumValue={0}
        maximumValue={duration}
        value={savedPosition}
        onSlidingComplete={seek}
        // minimumTrackTintColor="#42a5f5"
        // maximumTrackTintColor="#42a5f5"
        // TODO: handle color
      />
      <View style={tailwind('flex-row justify-between')}>
        <Text>{currentTime()}</Text>
        <Text>-{totalTime()}</Text>
      </View>
    </>
  )
}

export default ProgressSlider
