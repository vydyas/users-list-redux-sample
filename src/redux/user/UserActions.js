import {
  FETCH_USERS_STARTED,
  FETCH_USERS_FULFILLED,

  CREATE_USER_STARTED,
  USER_CREATED,

  UPDATE_USER_STARTED,
  USER_UPDATED,


  REMOVE_USER_STARTED,
  USER_REMOVED,
} from './UserConstants'

export const fetchUsers = payload => ( { type: FETCH_USERS_STARTED, payload } )
export const receiveUsers = payload => ( { type: FETCH_USERS_FULFILLED, payload } )

export const createUser = payload => ( { type: CREATE_USER_STARTED, payload } )
export const receiveCreatedUser = payload => ( { type: USER_CREATED, payload } )

export const updateUser = payload => ( { type: UPDATE_USER_STARTED, payload } )
export const receiveUpdatedUser = payload => ( { type: USER_UPDATED, payload } )

export const removeUser = payload => ( { type: REMOVE_USER_STARTED, payload } )
export const receiveRemovedUser = payload => ( { type: USER_REMOVED, payload } )

export default {
  fetchUsers,
  receiveUsers,

  createUser,
  receiveCreatedUser,

  updateUser,
  receiveUpdatedUser,

  removeUser,
  receiveRemovedUser
}
