import React from 'react'
import {render} from '@testing-library/react-native'

import Error from '../src/components/Error'

describe('Error', () => {
  it('renders correctly', () => {
    const tree = render(<Error errMsg="mock error" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
