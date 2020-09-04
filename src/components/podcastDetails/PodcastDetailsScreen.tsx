import React from 'react'
import { View, FlatList, Image, Text, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from "@react-navigation/native"
import tailwind from 'tailwind-rn';
import { SearchStackRouteParamsList } from '../navigators/types';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>

const PodcastDetialsScreen = () => {
    const { data } = useRoute<NavigationParams>().params ?? {}
    return (
        <View style={tailwind('flex-1 bg-white')}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={tailwind('flex-row my-4 px-4')}>
                            {data.thumbnail && <Image source={{ uri: data.thumbnail }} style={tailwind('h-20 w-20 mr-4 rounded-lg')} />}
                            <View style={tailwind('flex-1')}>
                                <Text style={tailwind('text-lg font-bold')}>{data.podcastName}</Text>
                                <Text style={tailwind('text-sm text-gray-600')}>{data.artist}</Text>
                                <Text style={tailwind('text-sm text-blue-600')}>Subscribed</Text>
                            </View>
                        </View>
                        <View style={tailwind('mb-4 px-4')}>
                            <Text>Play last episode</Text>
                        </View>
                        <View style={tailwind('mb-4 px-4')}>
                            <Text style={tailwind('text-lg font-bold')}>Episodes</Text>
                        </View>
                    </>
                }
                data={[{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]}
                ItemSeparatorComponent={() =>
                    <View style={tailwind('my-4 px-4')}>
                        <View style={[{ height: StyleSheet.hairlineWidth }, tailwind('bg-gray-600')]} />
                    </View>
                }
                renderItem={() =>
                    <View style={tailwind('px-4')}>
                        <Text style={tailwind('text-sm text-gray-600')}>FRIDAY</Text>
                        <Text style={tailwind('font-bold')}>#400 - The Title</Text>
                        <Text style={tailwind('text-sm text-gray-600')} numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                        <Text style={tailwind('text-sm text-gray-600')}>3hrs. 13min</Text>
                    </View>
                }
                keyExtractor={(item) => item.id} />
        </View>
    )
}

export default PodcastDetialsScreen