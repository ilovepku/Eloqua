import React, { FC } from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import tailwind from 'tailwind-rn';

import { SearchQuery_search } from "../../types/graphql"

interface Props {
    item: SearchQuery_search;
}

const SearchTile: FC<Props> = ({ item }) => {
    const navigation = useNavigation()
    const { podcastName, artist, episodesCount, thumbnail } = item
    return (
        <View style={tailwind('h-20 px-4 flex-row items-center')}>
            <View
                style={tailwind(
                    'h-12 w-12 mr-4',
                )}>
                {thumbnail && <Image source={{ uri: thumbnail }} style={tailwind('flex-1 rounded-lg')} />}
            </View>
            <View style={tailwind('flex-1')}>
                <Text style={tailwind('font-bold')} numberOfLines={1}>
                    {podcastName}
                </Text>
                <Text style={tailwind('text-sm text-gray-600')}>
                    {artist}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('PodcastDetails', { data: item })}>
                    <Text style={tailwind('text-sm text-blue-600')}>
                        {episodesCount} episodes
                    </Text>
                </TouchableOpacity>
            </View>
        </View>)
}

export default SearchTile