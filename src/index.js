import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import reduxThunk from 'redux-thunk';

import axios from 'axios';

window.axios = axios;

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
