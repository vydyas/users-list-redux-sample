import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
      <FlatButton label="Cancel"
                  primary={true}
                  style={progressStyle}
                  keyboardFocused={true}
                  onTouchTap={this.handleClose}/>,
      <FlatButton label="Ok"
                  className="e2e-ok-button"
                  primary={true}
                  style={progressStyle}
                  onTouchTap={this.handleOk}/>
    ];

    var product = this.state.product;
    return (
      <span>
        <span onTouchTap={this.handleOpen}>{this.props.children}</span>
        <Dialog
          title={`Update product with name: "${product.name}"`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <TextInput label="Name" className="e2e-name-input" value={product.name} onChange={this.changeProductProperty('name')}/>
          <TextInput label="Value" value={product.value} onChange={this.changeProductProperty('value')}/>
          <br/>
          <ProgressBar show={this.state.updating }/>
        </Dialog>
      </span>
    );
  }
}
