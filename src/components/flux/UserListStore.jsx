import axios from 'axios'
import EventEmitter from './EventEmitter'
function getApiUrl ( id ) {
  const apiKey = 'PGjxbP3NQzS2xXIe8PgSbJBxVzaPlXGe'
  const db = 'products-catalogue'
  const collection = 'products'
  return `https://api.mongolab.com/api/1/databases/${db}/collections/${collection}${id ? `/${  id}` : ''}?apiKey=${apiKey}`
}

export const UserListConstants = {
  GET_LIST: 'GET_LIST',
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
  UPDATE_USER: 'UPDATE_USER',
  USER_LIST_FETCHED: 'USER_LIST_FETCHED',
  USER_ADDED: 'USER_ADDED',
  USER_REMOVED: 'USER_REMOVED',
  USER_UPDATED: 'USER_UPDATED'
}

export const UserListStore = new EventEmitter()

UserListStore.addUserFetchedListener = function ( listener ) {
  this.on( UserListConstants.USER_LIST_FETCHED, listener )
}

UserListStore.fetchList = function () {
  return axios.get( getApiUrl() ).then( ( { data } )=> {
    this.users = data
    this.emit( UserListConstants.USER_LIST_FETCHED )
  } )
}

UserListStore.addUser = function ( user ) {
  return axios.post( getApiUrl(), user ).then( ()=> {
    return UserListStore.fetchList()
  } ).then( ()=> {
    this.emit( UserListConstants.USER_ADDED, user )
  } )
}

UserListStore.updateUser = function ( user ) {
  return axios.put( getApiUrl( user._id.$oid ), user ).then( ()=> {
    this.emit( UserListConstants.USER_UPDATED, user )
  } )
}

UserListStore.removeUser = function ( user ) {
  return axios.delete( getApiUrl( user._id.$oid ) ).then( ()=> {
    return UserListStore.fetchList()
  } ).then( ()=> {
    this.emit( UserListConstants.USER_REMOVED, user )
  } )
}

UserListStore.getUsers = function () {
  return this.users
}
