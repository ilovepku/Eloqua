import favoritesReducer, {toggleFav} from '../src/redux/favoritesSlice';

describe('toggleFav action', () => {
  it('should generate correct action', () => {
    const action = toggleFav('piece-1');
    expect(action.payload).toEqual('piece-1');
  });
});

describe('favorites reducer', () => {
  it('should handle initial state', () => {
    expect(favoritesReducer(undefined, {})).toEqual({favArr: []});
  });

  it('should handle favorites/toggleFav', () => {
    expect(favoritesReducer({favArr: []}, toggleFav('piece-1'))).toEqual({
      favArr: ['piece-1'],
    });

    expect(
      favoritesReducer({favArr: ['piece-1']}, toggleFav('piece-1')),
    ).toEqual({favArr: []});
  });
});
