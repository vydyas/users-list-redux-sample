import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from './TextInput';

export default class DialogExampleDialogDatePicker extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { open: true, product: props.product || {}};
  }

  handleOpen = () => {this.setState({ open: true });};
  handleClose = () => {this.setState({ open: false });};



  handleOk() {
    this.setState({ open: false });
    this.props.onUpdate();
  }

  change( key ) {
    return (function ( e ) {
      this.state.product[ key ] = e.target.value;
      this.setState({product: this.state.product})
    }).bind(this);
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}/>,
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleOk.bind(this)}/>
    ];

    var product = this.state.product;
    return (
      <RaisedButton label={this.props.label} primary={true} onTouchTap={this.handleOpen}>
        <Dialog
          title={'Update product with name: "' + product.name + '"'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <TextInput label="Name" value={product.name} onChange={this.change('name').bind(this)}/>
          <TextInput label="Value" value={product.value} onChange={this.change('value').bind(this)}/>
        </Dialog>
      </RaisedButton>
    );
  }
}
