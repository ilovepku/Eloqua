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
            {thumbnail && <Image source={{ uri: thumbnail }} style={tailwind('h-12 w-12 rounded-lg mr-4')} />}
            <View style={tailwind('flex-1')}>
                <Text style={tailwind('font-bold')} numberOfLines={1}>
                    {podcastName}
                </Text>
                <Text style={tailwind('text-sm text-gray-600')}>
                    {artist}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('PodcastStack', { screen: "PodcastDetails", params: { data: item } })}>
                    <Text style={tailwind('text-sm text-blue-600')}>
                        {episodesCount} episodes
                    </Text>
                </TouchableOpacity>
            </View>
        </View>)
}

export default SearchTile