import React from 'react'
import UserCard from './UserCard'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import UserDialog from './UserDialog'
import NotificationBar from './NotificationBar'

import { UserListActions } from './flux/UserListActions'
import { UserListStore } from './flux/UserListStore'

export default class extends React.Component {
  state = { users: [] }

  constructor ( props ) {
    super( props )
    UserListStore.addUserFetchedListener( () => this.setState( { users: UserListStore.getUsers() } ) )
    UserListActions.getList()
  }

  render () {
    return (
      <div>
        <NotificationBar />
        <UserDialog label="Create" onUpdate={ UserListActions.addUser }
                    user={ { name: 'user x', value: 'user y' } } open={ true }>
          <FloatingActionButton
            className="e2e-add-user"
            title="Add new user"
            mini={ true }
            style={ { float: 'right', marginTop: '-53px' } }>
            <ContentAdd />
          </FloatingActionButton>
        </UserDialog>
        {this.state.users.map( user =>
          <UserCard key={ user._id.$oid } card={ user }
                    onRemove={ UserListActions.removeUser }
                    onUpdate={ UserListActions.updateUser } />
        )}
      </div>
    )
  }
}
