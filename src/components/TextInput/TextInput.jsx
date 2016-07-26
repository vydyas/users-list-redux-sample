require('./TextInput.styl');

import React from 'react';
export default class extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { value: props.value };
  }

  change = ( event ) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event);
  };

  render() {
    return (
      <div className="TextInput">
        <div className="group">
          <input type="text" required value={this.state.value} onChange={this.change}/>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>{this.props.label}</label>
        </div>
      </div>
    );
  }
}
