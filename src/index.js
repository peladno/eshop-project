import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import USERContextProvider from './Context/UserContext';
import NotificationProvider from './Context/NotificationContext';
import ProductsContextProvider from './Context/ProductsContext';
import NewCartProvider from './Context/NewCartContext';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        {/*<USERContextProvider>*/}
        <ProductsContextProvider>
          <NewCartProvider>
            <App />
          </NewCartProvider>
        </ProductsContextProvider>
        {/*</USERContextProvider>*/}
      </NotificationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
