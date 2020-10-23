import React from 'react';
import {render} from '@testing-library/react-native';

import Error from '../src/components/error/Error';

describe('CategoryItem', () => {
  it('renders correctly', () => {
    const tree = render(<Error errMsg="mock error" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
