import React from 'react'
import { View, Image, Text, TouchableOpacity } from "react-native"
import FeatherIcon from 'react-native-vector-icons/Feather'
import tailwind from 'tailwind-rn';

import { usePlayerContext } from '../../contexts/PlayerContext';

const MiniPlayer = () => {
    const { isEmpty, currentTrack, isPaused, isPlaying, isStopped, play, pause } = usePlayerContext()

    // ternary operator?
    if (isEmpty || !currentTrack) {
        return null;
    }

    const { artwork, title } = currentTrack

    return (
        <View style={tailwind('h-16 px-4 border-t border-gray-300 flex-row items-center')}>
            <View style={tailwind('h-12 w-12 mr-4')}>
                <Image source={{ uri: artwork }} style={tailwind('flex-1 rounded-lg')} />
            </View>
            <View style={tailwind('flex-1 mr-4')}>
                <Text numberOfLines={1} style={tailwind('text-lg font-bold')}>{title}</Text>
            </View>
            <View>
                {isPaused && (
                    <TouchableOpacity onPress={() => play()}>
                        <FeatherIcon size={30} name="play" />
                    </TouchableOpacity>
                )}

                {isPlaying && (
                    <TouchableOpacity onPress={pause}>
                        <FeatherIcon size={30} name="pause" />
                    </TouchableOpacity>
                )}

                {isStopped && (
                    <TouchableOpacity onPress={() => null}>
                        <FeatherIcon size={30} name="square" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default MiniPlayer