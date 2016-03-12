import { REHYDRATE } from 'redux-persist/constants'

import {
  FETCH_USERS_STARTED,
  FETCH_USERS_FULFILLED,
  CREATE_USER_STARTED,
  USER_CREATED,
  REMOVE_USER_STARTED,
  USER_REMOVED,
  UPDATE_USER_STARTED,
  USER_UPDATED,
} from './UserConstants'

const initialState = {
  items: [],
  isFetchingList: false,
  isCreatingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false,
}

export default ( state = initialState, { payload, type } ) => {
  let items, itemIndex
  switch ( type ) {
  case REHYDRATE:
    return { ...initialState }
  case FETCH_USERS_STARTED:
    return { ...state, isFetchingList: true }
  case FETCH_USERS_FULFILLED:
    return { ...state, isFetchingList: false, items: payload }

  case CREATE_USER_STARTED:
    return { ...state, isCreatingUser: true }
  case USER_CREATED:
    items = state.items.slice()
    items.push( payload )
    return { ...state, isCreatingUser: false, items, lastAction: `Created user "${payload.first_name}"!'`  }

  case UPDATE_USER_STARTED:
    return { ...state, isUpdatingUser: true }
  case USER_UPDATED:
    items = state.items.slice()
    itemIndex = items.findIndex( ( { _id: { $oid } } ) => payload._id.$oid === $oid )
    items[itemIndex] = payload
    return { ...state, isUpdatingUser: false, items, lastAction: `Updated user "${payload.first_name}"!'`  }

  case REMOVE_USER_STARTED:
    return { ...state, isDeletingUser: true }
  case USER_REMOVED:
    items = state.items.slice()
    itemIndex = items.findIndex( ( { _id: { $oid } } ) => payload._id.$oid === $oid )
    items.splice( itemIndex, 1 )
    return { ...state, isDeletingUser: false, items, lastAction: `Removed user "${payload.first_name}"!'`  }
  default:
    return state
  }
}
