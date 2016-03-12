import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import UserDialog from './UserDialog'
import ProgressBar from './ProgressBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { UserListStore, UserListConstants } from './flux/UserListStore'

export default class extends React.Component {
  constructor ( props ) {
    super( props )
    this.state = { expanded: false, updating: false, user: props.card || {} }
    UserListStore.on( UserListConstants.USER_UPDATED, ( e, user ) => {
      if ( this.state.user._id.$oid === user._id.$oid ) {
        this.setState( { user: user } )
      }
    } )
  }

  handleExpandChange = expanded =>  this.setState( { expanded } );

  remove = () => {
    this.setState( { updating: true } )
    this.props.onRemove( this.state.user )
  };

  updateByDialog = user =>   this.props.onUpdate( user );

  render () {
    const user = this.state.user
    return (
      <Card expanded={ this.state.expanded } onExpandChange={ this.handleExpandChange }
            style={ { marginBottom: '10px' } }>
        <CardHeader
          title={ `${user.first_name} ${user.last_name}` }
          subtitle={ user.email }
          actAsExpander={ false }
          showExpandableButton={ false } />
        {user.balance && <CardText>Balance: {user.balance}</CardText>}
        <CardText>{user.description}</CardText>
        {!this.state.updating && <CardActions style={ { textAlign: 'right' } }>
          <FlatButton label="Delete" onTouchTap={ this.remove } />
          <UserDialog onUpdate={ this.updateByDialog } user={ user }>
            <RaisedButton label="Update" primary={ true } />
          </UserDialog>
        </CardActions>}
        <ProgressBar show={ this.state.updating } />
      </Card>
    )
  }
}
