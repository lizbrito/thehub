import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import './sass/style.scss';
import { store } from './store';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
