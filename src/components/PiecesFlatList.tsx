import React from 'react'
import {ListRenderItem, View, FlatList, Text} from 'react-native'

import tailwind from 'tailwind-rn'

import {AllPiecesQueryPiece} from '../types/graphql'
import {ASSETS_URL} from '../settings'
import PieceTile from './PieceTile'

interface Props {
  pieces: AllPiecesQueryPiece[]
  emptyMsg?: string
}

const PiecesFlatList: React.FC<Props> = ({pieces, emptyMsg}) => {
  const renderItem: ListRenderItem<AllPiecesQueryPiece> = ({
    item: {id, name, person, date, duration, audio_filename: audioFilename},
  }) => (
    <PieceTile
      track={{
        id: `piece-${id}`,
        title: name,
        artist: person.name,
        artwork: `${ASSETS_URL}/avatars%2F${person.img_filename}?alt=media`,
        duration,
        url: `${ASSETS_URL}/${audioFilename}?alt=media`,
      }}
      date={date}
    />
  )

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
      renderItem={renderItem}
      keyExtractor={(item): string => `piece-${item.id}`}
    />
  )
}

export default PiecesFlatList
