import React from 'react'
import { View, FlatList, Image, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { RouteProp, useRoute } from "@react-navigation/native"
import { useQuery } from "@apollo/client"
import FeatherIcon from 'react-native-vector-icons/Feather'
import tailwind from 'tailwind-rn';

import { SearchStackRouteParamsList } from '../navigators/types';
import feedQuery from '../../graphql/query/feedQuery'
import { getWeekDay, getReadableDuration } from "../../lib/dataTimeHelper"

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>

const PodcastDetialsScreen = () => {
    const { data: podcastData } = useRoute<NavigationParams>().params ?? {}

    const { data, loading, error } = useQuery(feedQuery, {
        variables: {
            feedUrl: podcastData.feedUrl
        }
    })

    return (
        <View style={tailwind('flex-1 bg-white')}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={tailwind('flex-row my-4 px-4')}>
                            {podcastData.thumbnail && <Image source={{ uri: podcastData.thumbnail }} style={tailwind('h-20 w-20 mr-4 rounded-lg')} />}
                            <View style={tailwind('flex-1')}>
                                <Text style={tailwind('text-lg font-bold')}>{podcastData.podcastName}</Text>
                                <Text style={tailwind('text-sm text-gray-600')}>{podcastData.artist}</Text>
                                <Text style={tailwind('text-sm text-blue-600')}>Subscribed</Text>
                            </View>
                        </View>
                        <View style={tailwind('flex-row mb-4 px-4 items-center')}>
                            <FeatherIcon size={30} color="#42a5f5" name="play" style={tailwind('mr-2')} />
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
                renderItem={({ item }) =>
                    <View style={tailwind('px-4')}>
                        <Text style={tailwind('text-sm text-gray-600')}>
                            {getWeekDay(new Date(item.pubDate)).toUpperCase()}
                        </Text>
                        <Text style={tailwind('font-bold')}>{item.title}</Text>
                        <Text style={tailwind('text-sm text-gray-600')} numberOfLines={2}>
                            {item.description}
                        </Text>
                        <Text style={tailwind('text-sm text-gray-600')}>
                            {getReadableDuration(item.duration)}
                        </Text>
                    </View>
                }
                keyExtractor={(item) => item.linkUrl} />
        </View>
    )
}

export default PodcastDetialsScreen