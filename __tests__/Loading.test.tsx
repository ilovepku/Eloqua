import React from 'react';
import {render} from '@testing-library/react-native';

import Loading from '../src/components/loading/Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    const tree = render(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
