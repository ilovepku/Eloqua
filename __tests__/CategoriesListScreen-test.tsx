import React from 'react';
import {render} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';

import {wait} from '../src/utils/testing';
import {CategoriesQuery_category} from '../src/types/graphql';
import categoriesQuery from '../src/graphql/query/categoriesQuery';
import CategoriesListScreen from '../src/components/categoriesListScreen/CategoriesListScreen';

const mockLoadingMsg = 'Loading...';
const mockErrMsg = 'mock error';

const queueMock = {
  request: {
    query: categoriesQuery,
  },
  result: {
    data: {
      categories: [
        {
          id: 1,
          name: 'Acknowledgement',
          icon_filename: 'acknowledgement.png',
        },
        {
          id: 2,
          name: 'Commencement',
          icon_filename: 'commencement.png',
        },
      ],
    },
  },
};
const queueErrorMock = {
  request: {
    query: categoriesQuery,
  },
  error: new Error(mockErrMsg),
};

jest.mock('../src/components/loading/Loading', () => () => (
  <p>{mockLoadingMsg}</p>
));
jest.mock(
  '../src/components/error/Error',
  () => ({errMsg}: {errMsg: string}) => <p>{errMsg}</p>,
);
jest.mock(
  '../src/components/categoriesListScreen/CategoryItem',
  () => ({
    category: {name, id, icon_filename},
  }: {
    category: CategoriesQuery_category;
  }) => (
    <>
      <p>{name}</p>
      <p>{id}</p>
      <p>{icon_filename}</p>
    </>
  ),
);

describe('CategoriesListScreen', () => {
  it('should render loading state initially', () => {
    const tree = render(
      <MockedProvider mocks={[queueMock]} addTypename={false}>
        <CategoriesListScreen />
      </MockedProvider>,
    ).toJSON();
    expect(tree?.children).toContain(mockLoadingMsg);
  });

  it('should show error UI', async () => {
    const component = render(
      <MockedProvider mocks={[queueErrorMock]} addTypename={false}>
        <CategoriesListScreen />
      </MockedProvider>,
    );

    await wait();

    const tree = component.toJSON();
    expect(tree?.children).toContain(mockErrMsg);
  });

  it('renders correctly', async () => {
    const component = render(
      <MockedProvider mocks={[queueMock]} addTypename={false}>
        <CategoriesListScreen />
      </MockedProvider>,
    );

    await wait();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
