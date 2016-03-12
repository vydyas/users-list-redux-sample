import {
  combineReducers,
  compose,
  applyMiddleware,
  createStore
} from 'redux'

import { autoRehydrate } from 'redux-persist'

import UserReducer from './user/UserReducer'
import UserEpics from './user/UserEpics'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(
  combineReducers( {
    user: UserReducer
  } ),
  composeEnhancers(
    applyMiddleware( UserEpics ),
    autoRehydrate()
  )
)
