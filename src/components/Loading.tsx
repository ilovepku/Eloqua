import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import tailwind from 'tailwind-rn'

const Loading: React.FC = () => (
  <View style={tailwind('flex-1 bg-white items-center justify-center')}>
    <ActivityIndicator size="large" color="#42a5f5" />
  </View>
)

export default Loading
