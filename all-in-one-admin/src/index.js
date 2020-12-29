import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './styles'
import App from './App';

import { Provider } from 'react-redux';
import createStore from './store';
import rootReducer from './store/reducers';

const store = createStore(rootReducer);
// 액션들을 디스패치
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


