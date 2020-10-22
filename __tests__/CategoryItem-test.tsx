import 'react-native';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CategoryItem from '../src/components/categoriesListScreen/CategoryItem';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

it('renders correctly', () => {
  const tree = render(
    <CategoryItem
      category={{
        __typename: 'categories',
        name: 'Acknowledgement',
        id: 1,
        icon_filename: 'acknowledgement.png',
      }}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('onPress: navigates to FilteredPiecesListScreen with correct params', async () => {
  const mockNavigate = jest.fn();
  // @ts-ignore
  useNavigation.mockImplementation(() => ({navigate: mockNavigate}));

  const {getByText} = render(
    <CategoryItem
      category={{
        __typename: 'categories',
        name: 'Acknowledgement',
        id: 1,
        icon_filename: 'acknowledgement.png',
      }}
    />,
  );

  const clickable = getByText(/Acknowledgement/i);
  fireEvent.press(clickable);

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith('FilteredPiecesListScreen', {
    category_id_filter: 'category-1',
    title: 'Acknowledgement',
  });
});
