

import React from 'react';
import MainRouter from 'routes';
import { Provider } from 'react-redux';
import CreateStoreConfig from 'reduxstore';

const store = CreateStoreConfig();

const App = () => {

  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};

export default App;