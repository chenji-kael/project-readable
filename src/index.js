import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import reducers from './reducers'

import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()
const middleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(middleware, thunk, createLogger()),
    )
)


ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
