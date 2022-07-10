import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);