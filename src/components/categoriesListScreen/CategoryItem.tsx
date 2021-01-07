import React from 'react'
import {View, TouchableOpacity, Image, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import tailwind from 'tailwind-rn'

import {CategoriesQuery_category} from '../../types/graphql'
import {ASSETS_URL} from '../../settings'

interface Props {
  category: CategoriesQuery_category
}

export default function CategoryItem({
  category: {name, id, icon_filename},
}: Props) {
  const navigation = useNavigation()

  const navigateToFilteredPiecesListScreen = () => {
    navigation.navigate('FilteredPiecesListScreen', {
      title: name,
      category_id_filter: `category-${id}`,
    })
  }

  return (
    <TouchableOpacity
      style={tailwind('w-1/3 h-24 mt-4 items-center')}
      onPress={navigateToFilteredPiecesListScreen}
    >
      <Image
        source={{
          uri: `${ASSETS_URL}/icons%2F${icon_filename}?alt=media`,
        }}
        style={tailwind('h-20 w-20 rounded-full mb-1')}
      />
      <View style={tailwind('flex-1 text-gray-700')}>
        <Text style={tailwind('text-center text-xs')}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}
