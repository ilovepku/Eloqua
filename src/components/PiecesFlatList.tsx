import React from 'react'
import {View, FlatList, Text} from 'react-native'

import tailwind from 'tailwind-rn'

import {AllPiecesQuery_piece} from '../types/graphql'
import {ASSETS_URL} from '../settings'
import PieceTile from './PieceTile'

interface Props {
  pieces: AllPiecesQuery_piece[]
  emptyMsg?: string
}

export default function PiecesFlatList({pieces, emptyMsg}: Props) {
  return (
    <FlatList
      style={tailwind('flex-1 bg-white')}
      keyboardShouldPersistTaps="never"
      data={pieces}
      ListEmptyComponent={
        <View style={tailwind('h-64 items-center justify-center')}>
          <Text style={tailwind('text-center text-lg text-gray-600')}>
            {emptyMsg}
          </Text>
          {/* TODO: theme color */}
        </View>
      }
      renderItem={({
        item: {id, name, person, date, duration, audio_filename},
      }) => (
        <PieceTile
          track={{
            id: `piece-${id}`,
            title: name,
            artist: person.name,
            artwork: `${ASSETS_URL}/avatars%2F${person.img_filename}?alt=media`,
            duration,
            url: `${ASSETS_URL}/${audio_filename}?alt=media`,
          }}
          date={date}
        />
      )}
      keyExtractor={item => `piece-${item.id}`}
    />
  )
}
