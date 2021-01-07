import playerReducer, {
  initialState,
  updateQueueArr,
  updateCurrentTrack,
  updateSavedPosition,
} from '../src/redux/playerSlice'

const mockTracks = [
  {
    id: 'piece-1',
    title: 'mockTitle1',
    artist: 'mockArtist1',
    artwork: 'mockArtworkPath1',
    duration: 100,
    url: 'mockUrl1',
  },
  {
    id: 'piece-2',
    title: 'mockTitle2',
    artist: 'mockArtist2',
    artwork: 'mockArtworkPath2',
    duration: 200,
    url: 'mockUrl2',
  },
]

describe('player actions', () => {
  it('should generate updateQueueArr action', () => {
    const action = updateQueueArr(mockTracks)
    expect(action.payload).toEqual(mockTracks)
  })

  it('should generate updateCurrentTrack action', () => {
    const action = updateCurrentTrack(mockTracks[0])
    expect(action.payload).toEqual(mockTracks[0])
  })

  it('should generate updateSavedPosition action', () => {
    const action = updateSavedPosition(50)
    expect(action.payload).toEqual(50)
  })
})

describe('player reducer', () => {
  it('should handle initial state', () => {
    expect(playerReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle updateQueueArr', () => {
    expect(playerReducer(initialState, updateQueueArr(mockTracks))).toEqual({
      ...initialState,
      queueArr: mockTracks,
    })
  })

  it('should handle updateCurrentTrack', () => {
    expect(
      playerReducer(initialState, updateCurrentTrack(mockTracks[0])),
    ).toEqual({
      ...initialState,
      currentTrack: mockTracks[0],
    })
  })

  it('should handle updateSavedPosition', () => {
    expect(playerReducer(initialState, updateSavedPosition(50))).toEqual({
      ...initialState,
      savedPosition: 50,
    })
  })
})
