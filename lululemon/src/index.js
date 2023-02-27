import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import actions from "./actions";


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers, applyMiddleware(thunk))

root.render(
  <Provider store={store}>
      <App/>
  </Provider>
);

