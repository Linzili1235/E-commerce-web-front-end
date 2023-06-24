import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers, applyMiddleware(thunk))

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Suspense fallback={<h1>Loading...</h1>}>
                <AuthProvider>
                <App />
                </AuthProvider>
            </Suspense>
        </Provider>
    </BrowserRouter>
);

