import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class extends React.Component {
  render() {
    var progressStyle = { display: this.props.show ? 'block' : 'none' };
    return (
      <LinearProgress mode="indeterminate" style={progressStyle}/>
    );
  }
}
