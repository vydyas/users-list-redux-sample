import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import UpdateProductDialog from './UpdateProductDialog';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';

export default class extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { expanded: false, updating: false };
  }

  handleExpandChange = ( expanded ) => {
    this.setState({ expanded: expanded });
  };

  remove = () => {
    this.setState({ updating: true });
    this.props.onRemove(this.props.card);
  };

  update() {
    this.setState({ updating: true });
    return this.props.onUpdate(this.props.card).then((function () {
      this.setState({ updating: false });
    }).bind(this));
  }

  render() {
    var product = this.props.card;
    var progressStyle = { display: this.state.updating ? 'block' : 'none' };
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}
            style={{ marginBottom: '10px' }}>
        <CardHeader
          title={product.name}
          subtitle={product.value}
          avatar={product.icon}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardMedia>
          <img src={product.picture}/>
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true}/>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions style={{textAlign: 'right'}}>
          <FlatButton label="Delete" onTouchTap={this.remove}/>
          <UpdateProductDialog label="Update" onUpdate={this.update.bind(this)} product={ product }/>
        </CardActions>
        <LinearProgress mode="indeterminate" style={progressStyle}/>
      </Card>
    );
  }
}
