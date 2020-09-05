import React, { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react'
import TrackPlayer, { Track, STATE_PLAYING, STATE_PAUSED, STATE_STOPPED } from "react-native-track-player"

interface PlayerContextType {
    isPlaying: boolean;
    isPaused: boolean;
    isStopped: boolean;
    isEmpty: boolean;
    currentTrack: Track | null;
    play: (track?: Track) => void;
    pause: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: false,
    currentTrack: null,
    play: () => null,
    pause: () => null
})

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
    const [playerState, setPlayerState] = useState(null)
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

    useEffect(() => {
        const listener = TrackPlayer.addEventListener("playback-state", ({ state }) => {
            setPlayerState(state);
        })
        return () => {
            listener.remove()
        }
    }, [])

    const play = async (track?: Track) => {
        if (track) {
            await TrackPlayer.add([track])
            setCurrentTrack(track)
        } else {
            if (!currentTrack) return
        }

        await TrackPlayer.play()
    }

    const pause = async () => {
        await TrackPlayer.pause()
    }

    const value = {
        isPlaying: playerState === STATE_PLAYING,
        isPaused: playerState === STATE_PAUSED,
        isStopped: playerState === STATE_STOPPED,
        isEmpty: playerState === null,
        currentTrack,
        pause,
        play
    }

    return (
        <PlayerContext.Provider value={value}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(PlayerContext)