import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { UserListStore, UserListConstants } from './flux/UserListStore'

export default class extends React.Component {
  state = { tooltipMessage: false }

  constructor ( props ) {
    super( props )
    UserListStore.on( UserListConstants.USER_ADDED, ( e, user )=> {
      this.setState( { tooltipMessage: `User "${user.name}" added!'` } )
    } ).on( UserListConstants.USER_REMOVED, user=> {
      this.setState( { tooltipMessage: `Removed user "${user.name}"!` } )
    } ).on( UserListConstants.USER_UPDATED, ( e, user )=> {
      this.setState( { tooltipMessage: `User updated to "${user.name}"!` } )
    } )
  }

  handleRequestClose = () => {this.setState( { tooltipMessage: false } )};

  render () {
    return <Snackbar
      open={ !!this.state.tooltipMessage }
      message={ this.state.tooltipMessage }
      autoHideDuration={ 1500 }
      className="e2e-message"
      onRequestClose={ this.handleRequestClose } />
  }
}

