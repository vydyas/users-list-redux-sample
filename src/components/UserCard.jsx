import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import UserDialog from './UserDialog'
import ProgressBar from './ProgressBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

export default class extends React.Component {
  constructor ( props ) {
    super( props )
    this.state = { updateDialogOpened: false, updating: false }
  }

  onUpdate = user=> {
    this.setState( { updating: true } )
    this.props.onUpdate( user )
  }

  onRemove = () =>  {
    this.setState( { updating: true } )
    this.props.onRemove( this.props.user )
  }

  handleOpen = () => this.setState( { updateDialogOpened: true } )
  handleClose = () => this.setState( { updateDialogOpened: false } )

  componentWillUpdate ( { isUpdatingUser } ) {
    if ( this.state.updateDialogOpened && !isUpdatingUser && this.props.isUpdatingUser !== isUpdatingUser ) {
      this.handleClose()
      this.setState( { updating: false } )
    }
  }

  render () {
    const [{ updateDialogOpened: open }, { user }] = [this.state, this.props]
    const { handleClose, handleOpen, onUpdate, onRemove } = this

    return (
      <Card expanded={ true }  style={ { marginBottom: '10px' } }>
        <CardHeader
          title={ `${user.first_name || ''} ${user.last_name || ''}` }
          subtitle={ user.email }
          actAsExpander={ false }
          showExpandableButton={ false } />
        {user.balance && <CardText>Balance: {user.balance}</CardText>}
        <CardText>{user.description}</CardText>
        {!this.state.updating && <CardActions style={ { textAlign: 'right' } }>
          <FlatButton label="Delete" onTouchTap={ onRemove } />
          <UserDialog { ...{ handleClose, handleOpen, open, user, onUpdate } }>
            <RaisedButton label="Update" primary={ true } />
          </UserDialog>
        </CardActions>}
        <ProgressBar show={ this.state.updating } />
      </Card>
    )
  }
}
