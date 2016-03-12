import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextInput from './TextInput'
import ProgressBar from './ProgressBar'

export default class DialogExampleDialogDatePicker extends React.Component {
  constructor ( props ) {
    super( props )
    this.isCreate = !props.user
    this.state = { updating: false, user: {} }
  }

  componentWillUpdate ( { open, user = {} } ) {
    if ( open && this.props.open !== open ) {
      this.setState( { updating: false, user: { ... user } } )
    }
  }

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
    return <TextInput  { ...{ label, type } } value={ this.state.user[field] }
                       onChange={ this.changeUserProperty( field ) } />
  }

  render () {
    const progressStyle = { display: this.state.updating ? 'none' : 'inline-block' }

    const actions = [
      <FlatButton label="Cancel" key="cancel"
                  primary={ true }
                  style={ progressStyle }
                  keyboardFocused={ true }
                  onTouchTap={ this.props.handleClose } />,
      <FlatButton label="Ok" key="ok"
                  className="e2e-ok-button"
                  primary={ true }
                  style={ progressStyle }
                  onTouchTap={ this.handleOk } />
    ]
    const user = this.state.user
    const { first_name = '', last_name = '' } = user
    let title = 'New user:'
    if ( !this.isCreate ) {
      title = `Update user with name: "${first_name || ''} ${last_name || ''}"`
    }
    const open = !!this.props.open

    const ChangableInput = this.ChangableInput

    return (
      <span>
        <span onTouchTap={ this.props.handleOpen }>{this.props.children}</span>
        <Dialog  { ...{ title, actions, open, modal: false } }>
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
