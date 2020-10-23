import {act} from '@testing-library/react-native';

// wait for response helper
export async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}
