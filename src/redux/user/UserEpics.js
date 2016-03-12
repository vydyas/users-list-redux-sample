import { UserMongoApi } from './UserMongoApi'

import {
  FETCH_USERS_STARTED,
  CREATE_USER_STARTED,
  UPDATE_USER_STARTED,
  REMOVE_USER_STARTED,
} from './UserConstants'

import {
  receiveUsers,
  receiveCreatedUser,
  receiveUpdatedUser,
  receiveRemovedUser
} from './UserActions'

const prepareUserForServer = user => {
  user = { ... user }
  const { first_name, last_name } = user
  user.meta_data = { first_name, last_name }
  delete user.first_name
  delete user.last_name
  return user
}

const parseUserFromServer = user => {
  user = { ... user }
  const { first_name, last_name } = user.meta_data
  delete user.meta_data
  Object.assign( user, { first_name, last_name } )
  return user
}

export default () => next => action => {
  const { type, payload } = action
  switch ( type ) {
  case FETCH_USERS_STARTED:
    UserMongoApi.get().then( ( { data } ) => next( receiveUsers( data.map( parseUserFromServer ) ) ) )
    break
  case CREATE_USER_STARTED:
    UserMongoApi.post( prepareUserForServer( payload ) ).then( ( { data } ) => next( receiveCreatedUser( parseUserFromServer( data ) ) ) )
    break
  case UPDATE_USER_STARTED:
    UserMongoApi.put( prepareUserForServer( payload ) ).then( ( { data } ) => next( receiveUpdatedUser( parseUserFromServer( data ) ) ) )
    break
  case REMOVE_USER_STARTED:
    UserMongoApi.delete( prepareUserForServer( payload ) ).then( ( { data } ) => next( receiveRemovedUser( parseUserFromServer( data ) ) ) )
    break
  default:
    break
  }
  return next( action )
}

