import React from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"
import FeatherIcon from 'react-native-vector-icons/Feather'
import tailwind from 'tailwind-rn';

import { usePlayerContext } from '../../contexts/PlayerContext'
import { FeedQuery_feed, SearchQuery_search } from '../../types/graphql'
import { getReadableDuration } from '../../lib/dateTimeHelper';

const EpisodeDetailsScreen = () => {
    const playerContext = usePlayerContext()

    const { episode: { image, title, linkUrl, duration, description }, podcast: { thumbnail, artist } } = (useRoute().params ?? {}) as {
        episode: FeedQuery_feed
        podcast: SearchQuery_search
    }

    return (
        <View style={tailwind('flex-1 bg-white')}>
            <ScrollView>
                <View style={tailwind('px-4')}>
                    <View style={tailwind('my-4 flex-row')}>
                        <Image source={{ uri: image ?? thumbnail }} style={tailwind('h-16 w-16 mr-4 rounded-lg')} />
                        <Text style={tailwind('flex-1 text-lg font-bold')}>{title}</Text>
                    </View>

                    <View style={tailwind('flex-row mb-4 items-center')}>
                        <TouchableOpacity onPress={() => {
                            playerContext.play({
                                title: title,
                                artwork: image ?? thumbnail,
                                id: linkUrl,
                                url: linkUrl,
                                artist: artist
                            })
                        }
                        }>
                            <FeatherIcon size={30} color="#42a5f5" name="play" style={tailwind('mr-2')} />
                        </TouchableOpacity>
                        <View style={tailwind('flex-1')}>
                            <Text style={tailwind('font-bold')}>Play</Text>
                            <Text style={tailwind('text-sm text-gray-600')}>
                                {getReadableDuration(duration)}
                            </Text>
                        </View>
                    </View>

                    <View style={[{ height: StyleSheet.hairlineWidth }, tailwind('mb-4 bg-gray-300')]} />

                    <View>
                        <Text style={tailwind('mb-4 text-lg font-bold')}>Episode Notes</Text>
                        <Text>{description}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EpisodeDetailsScreen