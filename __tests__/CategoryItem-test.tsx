import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

import CategoryItem from '../src/components/categoriesListScreen/CategoryItem';

const mockCategoryProp = {
  name: 'Acknowledgement',
  id: 1,
  icon_filename: 'acknowledgement.png',
};

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

describe('CategoryItem', () => {
  it('renders correctly', () => {
    const tree = render(<CategoryItem category={mockCategoryProp} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onPress: navigates to FilteredPiecesListScreen with correct params', async () => {
    const mockNavigate = jest.fn();
    // @ts-ignore
    useNavigation.mockImplementation(() => ({navigate: mockNavigate}));

    const {getByText} = render(<CategoryItem category={mockCategoryProp} />);

    const clickable = getByText(new RegExp(mockCategoryProp.name, 'i'));
    fireEvent.press(clickable);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
    expect(mockNavigate).toHaveBeenCalledWith('FilteredPiecesListScreen', {
      category_id_filter: `category-${mockCategoryProp.id}`,
      title: mockCategoryProp.name,
    });
  });
});
