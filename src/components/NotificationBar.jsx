import React from 'react'
import { connect } from 'react-redux'

import Snackbar from 'material-ui/Snackbar'

class NotificationBar extends React.Component {
  state = { tooltipMessage: false }

  componentWillUpdate ( { lastAction } ) {
    if ( this.props.lastAction !== lastAction ) {
      this.setState( { tooltipMessage: lastAction || false } )
    }
  }

  handleRequestClose = () => {
    this.setState( { tooltipMessage: false } )
  };

  render () {
    return <Snackbar
      open={ !!this.state.tooltipMessage }
      message={ this.state.tooltipMessage }
      autoHideDuration={ 1500 }
      className="e2e-message"
      onRequestClose={ this.handleRequestClose } />
  }
}

export default connect(
  ( { user: { lastAction } } ) => ( { lastAction, } ),
)( NotificationBar )

