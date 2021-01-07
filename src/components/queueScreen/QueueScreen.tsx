import React from 'react'
import {View, TouchableOpacity, Text, ScrollView} from 'react-native'
import {useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import tailwind from 'tailwind-rn'

import {RootState} from '../../redux/rootReducer'
import PieceTile from '../pieceTile/PieceTile'

export default function QueueScreen() {
  const {queueArr} = useSelector((state: RootState) => state.player)

  const navigation = useNavigation()

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('flex-row justify-between px-4 my-4')}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={tailwind('flex-1')}
        >
          <Text>Done</Text>
        </TouchableOpacity>

        <Text style={tailwind('flex-1 text-center font-bold')}>Up Next</Text>
        <View style={tailwind('flex-1')} />
      </View>
      <ScrollView>
        {queueArr.map(track => (
          <PieceTile key={`piece-${track.id}`} track={track} />
        ))}
      </ScrollView>
    </View>
  )
}
