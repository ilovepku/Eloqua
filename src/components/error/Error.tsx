import React from 'react'
import {View, Text} from 'react-native'
import tailwind from 'tailwind-rn'

interface Props {
  errMsg: string
}
export default function Error({errMsg}: Props) {
  return (
    <View style={tailwind('flex-1 bg-white items-center justify-center')}>
      <Text style={tailwind('text-lg text-red-600')}>{errMsg}</Text>
    </View>
  )
}
