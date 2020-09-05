import React from 'react'
import { View, FlatList, Image, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { RouteProp, useRoute } from "@react-navigation/native"
import { useQuery } from "@apollo/client"
import FeatherIcon from 'react-native-vector-icons/Feather'
import tailwind from 'tailwind-rn';

import { SearchStackRouteParamsList } from '../navigators/types';
import feedQuery from '../../graphql/query/feedQuery'
import { getWeekDay, getReadableDuration } from "../../lib/dataTimeHelper"
import { usePlayerContext } from '../../contexts/PlayerContext'

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>

const PodcastDetialsScreen = () => {
    const playerContext = usePlayerContext()

    const { data: { thumbnail, podcastName, artist, feedUrl } } = useRoute<NavigationParams>().params ?? {}

    const { data, loading, error } = useQuery(feedQuery, {
        variables: {
            feedUrl
        }
    })

    return (
        <View style={tailwind('flex-1 bg-white')}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={tailwind('flex-row my-4 px-4')}>
                            {thumbnail && <Image source={{ uri: thumbnail }} style={tailwind('h-20 w-20 mr-4 rounded-lg')} />}
                            <View style={tailwind('flex-1')}>
                                <Text style={tailwind('text-lg font-bold')}>{podcastName}</Text>
                                <Text style={tailwind('text-sm text-gray-600')}>{artist}</Text>
                                <Text style={tailwind('text-sm text-blue-600')}>Subscribed</Text>
                            </View>
                        </View>
                        <View style={tailwind('flex-row mb-4 px-4 items-center')}>
                            <TouchableOpacity onPress={() => {
                                const el = data?.feed[0]

                                if (!el) {
                                    return
                                }

                                playerContext.play({
                                    title: el.title,
                                    artwork: el.image ?? thumbnail,
                                    id: el.linkUrl,
                                    url: el.linkUrl,
                                    artist: artist
                                })
                            }
                            }>
                                <FeatherIcon size={30} color="#42a5f5" name="play" style={tailwind('mr-2')} />
                            </TouchableOpacity>
                            <View>
                                <Text style={tailwind('font-bold')}>Play</Text>
                                <Text style={tailwind('text-sm')}>{data?.feed[0].title}</Text>
                            </View>
                        </View>
                        <View style={tailwind('mb-4 px-4')}>
                            <Text style={tailwind('text-lg font-bold')}>Episodes</Text>
                        </View>

                        {loading &&
                            <View style={tailwind('h-64 items-center justify-center')}>
                                <ActivityIndicator size="large" color="#42a5f5" />
                            </View>
                        }{/* TODO: theme color */}
                    </>
                }
                data={data?.feed}
                ItemSeparatorComponent={() =>
                    <View style={tailwind('my-4 px-4')}>
                        <View style={[{ height: StyleSheet.hairlineWidth }, tailwind('bg-gray-600')]} />
                    </View>
                }
                renderItem={({ item: { pubDate, title, description, duration } }) =>
                    <View style={tailwind('px-4')}>
                        <Text style={tailwind('text-sm text-gray-600')}>
                            {getWeekDay(new Date(pubDate)).toUpperCase()}
                        </Text>
                        <Text style={tailwind('font-bold')}>{title}</Text>
                        <Text style={tailwind('text-sm text-gray-600')} numberOfLines={2}>
                            {description}
                        </Text>
                        <Text style={tailwind('text-sm text-gray-600')}>
                            {getReadableDuration(duration)}
                        </Text>
                    </View>
                }
                keyExtractor={(item) => item.linkUrl} />
        </View>
    )
}

export default PodcastDetialsScreen