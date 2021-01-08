import React from 'react'
import {View, TouchableOpacity, Image, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import tailwind from 'tailwind-rn'

import {PersonsQueryPerson} from '../types/graphql'
import {ASSETS_URL} from '../settings'

interface Props {
  person: PersonsQueryPerson
}

const PersonItem: React.FC<Props> = ({
  person: {name, id, img_filename: imgFilename},
}) => {
  const navigation = useNavigation()

  const navigateToFilteredPiecesListScreen = (): void => {
    navigation.navigate('FilteredPiecesListScreen', {
      title: name,
      personIdFilter: `person-${id}`,
    })
  }

  return (
    <TouchableOpacity
      style={tailwind('w-1/3 h-24 mt-4 items-center')}
      onPress={navigateToFilteredPiecesListScreen}
    >
      <Image
        source={{
          uri: `${ASSETS_URL}/avatars%2F${imgFilename}?alt=media`,
        }}
        style={tailwind('h-20 w-20 rounded-lg mb-1')}
      />
      <View style={tailwind('flex-1 text-gray-700')}>
        <Text style={tailwind('text-center text-xs')}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PersonItem
