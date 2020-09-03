import React, { FC } from "react"
import { View, Image, Text } from "react-native"
import tailwind from 'tailwind-rn';

import { SearchQuery_search } from "../../types/graphql"

interface Props {
    item: SearchQuery_search;
}

const SearchTile: FC<Props> = ({ item: { podcastName, artist, episodesCount, thumbnail } }) => (
    <View style={tailwind('h-20 px-4 flex-row items-center')}>
        <View
            style={tailwind(
                'h-12 w-12 rounded-lg mr-4',
            )}>
            {thumbnail && <Image source={{ uri: thumbnail }} style={tailwind('flex-1 rounded-lg')} />}
        </View>
        <View style={tailwind('flex-1')}>
            <Text style={tailwind('font-bold')} numberOfLines={1}>{podcastName}</Text>
            <Text style={tailwind('text-sm text-gray-600')}>
                {artist}
            </Text>
            <Text style={tailwind('text-sm text-blue-600')}>
                {episodesCount} episodes
            </Text>
        </View>
    </View>)

export default SearchTile