import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// applyMiddleware helps us add our own middleware to the store
// compose allows us to combine enhancers
// combineReducers allows us to combine reducers
import { createStore, applyMiddleware, compose } from 'redux'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import burgerBuilderReducer from './store/reducers/burgerBuilder'

// const logger = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware] Dispatching', action)
//             const result = next(action);
//             console.log('[Middleware] next state', store.getState())
//             return result
//         }
//     }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// you can pass a list of middleware to applyMiddleware,
// they will be executed in that order
const store = createStore(burgerBuilderReducer,
    // composeEnhancers(
    // applyMiddleware(logger /** anotherMiddlewareCanBeHere */))
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// the provider should wrap everything
const app = <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
</Provider>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
