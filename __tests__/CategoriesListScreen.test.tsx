import React from 'react'
import {render} from '@testing-library/react-native'
import {MockedProvider} from '@apollo/client/testing'

import {wait} from '../jest/test-utils'
import {CategoriesQueryCategory} from '../src/types/graphql'
import categoriesQuery from '../src/graphql/query/categoriesQuery'
import CategoriesListScreen from '../src/screens/CategoriesListScreen'

const mockLoadingMsg = 'Loading...'
const mockErrMsg = 'mock error'

const categoriesQueryMock = {
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
}
const categoriesQueryErrorMock = {
  request: {
    query: categoriesQuery,
  },
  error: new Error(mockErrMsg),
}

jest.mock('../src/components/loading/Loading', () => () => (
  <p>{mockLoadingMsg}</p>
))
jest.mock(
  '../src/components/error/Error',
  () => ({errMsg}: {errMsg: string}) => <p>{errMsg}</p>,
)
jest.mock(
  '../src/components/categoriesListScreen/CategoryItem',
  () => ({
    category: {name, id, icon_filename},
  }: {
    category: CategoriesQueryCategory
  }) => (
    <>
      <p>{name}</p>
      <p>{id}</p>
      <p>{icon_filename}</p>
    </>
  ),
)

describe('CategoriesListScreen', () => {
  it('should render loading state initially', () => {
    const tree = render(
      <MockedProvider mocks={[categoriesQueryMock]} addTypename={false}>
        <CategoriesListScreen />
      </MockedProvider>,
    ).toJSON()
    expect(tree?.children).toContain(mockLoadingMsg)
  })

  it('should show error UI', async () => {
    const component = render(
      <MockedProvider mocks={[categoriesQueryErrorMock]} addTypename={false}>
        <CategoriesListScreen />
      </MockedProvider>,
    )

    await wait()

    const tree = component.toJSON()
    expect(tree?.children).toContain(mockErrMsg)
  })

  it('renders correctly', async () => {
    const component = render(
      <MockedProvider mocks={[categoriesQueryMock]} addTypename={false}>
        <CategoriesListScreen />
      </MockedProvider>,
    )

    await wait()

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
