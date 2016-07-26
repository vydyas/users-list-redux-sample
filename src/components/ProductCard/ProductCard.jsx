import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import UpdateProductDialog from './UpdateProductDialog';
import ProgressBar from '../ProgressBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { expanded: false, updating: false, product: props.card || {} };
  }

  handleExpandChange = ( expanded ) => {
    this.setState({ expanded: expanded });
  };

  remove = () => {
    this.setState({ updating: true });
    this.props.onRemove(this.state.product);
  };

  updateByDialog = ( product ) => {
    return this.props.onUpdate(product).then(()=> {
      this.setState({ product: product });
    });
  };

  render() {
    var product = this.state.product;
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
        <CardTitle title="Lorem ipsum" subtitle="Donec mattis" expandable={true}/>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions style={{textAlign: 'right'}}>
          <FlatButton label="Delete" onTouchTap={this.remove} className={'e2e-remove-' + encodeURI(product.name)}/>
          <UpdateProductDialog onUpdate={this.updateByDialog} product={ product }>
            <RaisedButton label="Update" primary={true}/>
          </UpdateProductDialog>
        </CardActions>
        <ProgressBar show={this.state.updating }/>
      </Card>
    );
  }
}
