import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../TextInput/TextInput';
import ProgressBar from '../ProgressBar';

export default class DialogExampleDialogDatePicker extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      updating: false,
      open: false,
      product: props.product || {}
    };
  }

  handleOpen = () => {this.setState({ open: true });};
  handleClose = () => {this.setState({ open: false });};

  handleOk = () => {
    this.setState({ updating: true });
    this.props.onUpdate(this.state.product).then(() => {
      this.setState({ open: false, updating: false });
    });
  };
  
  changeProductProperty = ( property ) => {
    return ( changeEvent ) => {
      this.state.product[ property ] = changeEvent.target.value;
      this.setState({ product: this.state.product })
    };
  };

  render() {
    var progressStyle = { display: this.state.updating ? 'none' : 'inline-block' };

    const actions = [
      <FlatButton label="Cancel" primary={true} style={progressStyle}
                  keyboardFocused={true}
                  onTouchTap={this.handleClose}/>,
      <FlatButton label="Ok" primary={true} style={progressStyle}
                  onTouchTap={this.handleOk}/>
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
          <TextInput label="Name" value={product.name} onChange={this.changeProductProperty('name')}/>
          <TextInput label="Value" value={product.value} onChange={this.changeProductProperty('value')}/>
          <br/>
          <ProgressBar show={this.state.updating }/>
        </Dialog>
      </RaisedButton>
    );
  }
}
