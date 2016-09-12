import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default props =>
  <LinearProgress mode="indeterminate" style={{ display: props.show ? 'block' : 'none' }}/>
