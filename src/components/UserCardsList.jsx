import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import UserDialog from './UserDialog'
import UserCard from './UserCard'
import NotificationBar from './NotificationBar'

import { fetchUsers, removeUser, updateUser, createUser } from '../redux/user/UserActions'

class UserCardsList extends React.Component {
  state = { createDialogOpened: false }

  constructor ( props ) {
    super( props )
    props.fetchUsers()
  }

  componentWillUpdate ( { isCreatingUser } ) {
    if ( !isCreatingUser && this.props.isCreatingUser !== isCreatingUser ) {
      this.handleClose()
    }
  }

  handleOpen = () => this.setState( { createDialogOpened: true } )
  handleClose = () => this.setState( { createDialogOpened: false } )

  render () {
    const { createUser, updateUser, removeUser, users, isUpdatingUser } = this.props
    const { createDialogOpened: open } = this.state
    const { handleClose, handleOpen } = this

    return (
      <div>
        <NotificationBar />
        <UserDialog onUpdate={ createUser } { ...{ handleClose, handleOpen, open } }>
          <FloatingActionButton title="Add new user" mini={ true } style={ { float: 'right', marginTop: '-53px' } }>
            <ContentAdd />
          </FloatingActionButton>
        </UserDialog>
        {users.map( user =>
          <UserCard key={ user._id.$oid } user={ user } onRemove={ removeUser } onUpdate={ updateUser }
                    isUpdatingUser={ isUpdatingUser } />
        )}
      </div>
    )
  }
}

export default connect(
  ( { user: { items: users, isCreatingUser, isUpdatingUser } } ) => ( { users, isCreatingUser, isUpdatingUser } ),
  { fetchUsers, createUser, updateUser, removeUser }
)( UserCardsList )
