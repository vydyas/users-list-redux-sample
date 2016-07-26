import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

export default class extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandChange = ( expanded ) => {
    this.setState({ expanded: expanded });
  };
  handleToggle = ( event, expanded ) => {
    this.setState({ expanded: expanded });
  };
  handleExpand = () => {
    this.setState({ expanded: true });
  };
  handleReduce = () => {
    this.setState({ expanded: false });
  };

  render() {
    var card = this.props.card;
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={card.name}
          subtitle={card.price}
          avatar={card.icon}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label={'Toggle "' + card.name + '"'}
          />
        </CardText>
        <CardMedia expandable={true}>
          <img src={card.picture}/>
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true}/>
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand}/>
          <FlatButton label="Reduce" onTouchTap={this.handleReduce}/>
        </CardActions>
      </Card>
    );
  }
}
