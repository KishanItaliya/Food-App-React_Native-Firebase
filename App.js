import React from 'react';
import Providers from './src/navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/redux/reducer';

// create store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => {
  return (
    <Provider store={store}>
      <Providers />
    </Provider>
  );
};

export default App;
