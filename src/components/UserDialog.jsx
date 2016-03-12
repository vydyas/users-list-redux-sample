import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextInput from './TextInput'
import { UserListStore, UserListConstants } from './flux/UserListStore'
import ProgressBar from './ProgressBar'

export default class DialogExampleDialogDatePicker extends React.Component {
  constructor ( props ) {
    super( props )
    this.state = {
      updating: false,
      open: props.open || false,
      user: { ...( props.user || {} ) }
    }
  }

  closePopupListener = () => this.setState( { open: false, updating: false } )

  componentDidMount () {
    UserListStore.on( [
      UserListConstants.USER_ADDED,
      UserListConstants.USER_UPDATED
    ], this.closePopupListener )
  }

  componentWillUnmount () {
    UserListStore.removeListener( [
      UserListConstants.USER_ADDED,
      UserListConstants.USER_UPDATED
    ], this.closePopupListener )
  }

  handleOpen = () => {
    this.setState( { open: true } )
  };

  handleOk = () => {
    this.setState( { updating: true } )
    this.props.onUpdate( this.state.user )
  };

  changeUserProperty = property => changeEvent => {
    const user = this.state.user
    user[property] = changeEvent.target.value
    this.setState( { user } )
  };

  ChangableInput = ( { label, field, type } ) => {
    return <TextInput  { ...{ label, type } } value={ this.state.user[field] } onChange={ this.changeUserProperty( field ) } />
  }

  render () {
    const progressStyle = { display: this.state.updating ? 'none' : 'inline-block' }

    const actions = [
      <FlatButton label="Cancel" key="cancel"
                  primary={ true }
                  style={ progressStyle }
                  keyboardFocused={ true }
                  onTouchTap={ this.closePopupListener } />,
      <FlatButton label="Ok" key="ok"
                  className="e2e-ok-button"
                  primary={ true }
                  style={ progressStyle }
                  onTouchTap={ this.handleOk } />
    ]
    const user = this.state.user
    const { first_name = '', last_name = '' } = user
    let title = 'New user:'
    if ( first_name || last_name ) {
      title = `Update user with name: "${first_name} ${last_name}"`
    }

    const ChangableInput = this.ChangableInput

    return (
      <span>
        <span onTouchTap={ this.handleOpen }>{this.props.children}</span>
        <Dialog modal={ false } open={ this.state.open } onRequestClose={ this.closePopupListener } { ...{
          title,
          actions
        } }>
          <div style={ { display: 'flex' } }>
            <ChangableInput { ...{ label: 'Email', field: 'email', type: 'email' } } />
            <div style={ { width: '32px' } } />
            <ChangableInput { ...{ label: 'Balance', field: 'balance' } } />
          </div>
          <div style={ { display: 'flex', margin: '0 -10px' } }>
            <ChangableInput { ...{ label: 'First Name', field: 'first_name' } } />
            <div style={ { width: '32px' } } />
            <ChangableInput { ...{ label: 'Last Name', field: 'last_name' } } />
          </div>
          <ChangableInput { ...{ label: 'Description', field: 'description', type: 'textarea' } } />
          <ProgressBar show={ this.state.updating } />
        </Dialog>
      </span>
    )
  }
}
