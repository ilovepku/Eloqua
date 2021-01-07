import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {act, render as rtlRender} from '@testing-library/react-native'

import reducer from '../src/redux/rootReducer'

// wait for response helper
export async function wait(ms = 0) {
  await act(
    () =>
      new Promise(resolve => {
        setTimeout(resolve, ms)
      }),
  )
}

// override default render with mock store
function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

// re-export everything
export * from '@testing-library/react-native'
// override render method
export {render}
