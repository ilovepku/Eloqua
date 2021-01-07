import favoritesReducer, {
  initialState,
  toggleFav,
} from '../src/redux/favoritesSlice'

describe('favorites actions', () => {
  it('should generate toggleFav action', () => {
    const action = toggleFav('piece-1')
    expect(action.payload).toEqual('piece-1')
  })
})

describe('favorites reducer', () => {
  it('should handle initial state', () => {
    expect(favoritesReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle toggleFav', () => {
    expect(favoritesReducer(initialState, toggleFav('piece-1'))).toEqual({
      favArr: ['piece-1'],
    })

    expect(
      favoritesReducer({favArr: ['piece-1']}, toggleFav('piece-1')),
    ).toEqual(initialState)
  })
})
