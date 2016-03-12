import Dispatcher from './Dispatcher'
import { UserListStore, UserListConstants } from './UserListStore'

export const UserListActions = {
  getList: ()=> UserListDispatcher.dispatch( { actionType: UserListConstants.GET_LIST } )
  ,
  addUser: user =>UserListDispatcher.dispatch( { actionType: UserListConstants.ADD_USER, user: user } )
  ,
  removeUser: user =>UserListDispatcher.dispatch( { actionType: UserListConstants.REMOVE_USER, user: user } )
  ,
  updateUser: user=>UserListDispatcher.dispatch( { actionType: UserListConstants.UPDATE_USER, user: user } )
}

export const UserListDispatcher = new Dispatcher()
const actionsMap = {
  [UserListConstants.GET_LIST]: ()=> UserListStore.fetchList(),
  [UserListConstants.ADD_USER]: action=> UserListStore.addUser( action.user ),
  [UserListConstants.REMOVE_USER]: action=> UserListStore.removeUser( action.user ),
  [UserListConstants.UPDATE_USER]: action=> UserListStore.updateUser( action.user )
}
UserListDispatcher.register( function ( action ) {
  if ( actionsMap[ action.actionType ] ) {
    actionsMap[ action.actionType ]( action )
  }
} )
