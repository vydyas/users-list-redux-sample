import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import ProductDialog from './ProductDialog';
import ProgressBar from '../ProgressBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { ProductListStore, ProductListConstants } from '../flux/ProductListStore';

export default class extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { expanded: false, updating: false, product: props.card || {} };
    ProductListStore.on(ProductListConstants.PRODUCT_UPDATED, ( e, product )=> {
      if ( this.state.product._id.$oid === product._id.$oid ) {
        this.setState({ product: product });
      }
    });
  }

  handleExpandChange = ( expanded ) => {
    this.setState({ expanded: expanded });
  };

  remove = () => {
    this.setState({ updating: true });
    this.props.onRemove(this.state.product);
  };

  updateByDialog = ( product ) => {
    this.props.onUpdate(product)
  };

  render() {
    var product = this.state.product;
    var cardActions
    if ( !this.state.updating ) {
      cardActions =
        <CardActions style={{textAlign: 'right'}}>
          <FlatButton label="Delete" onTouchTap={this.remove}
                      className={`e2e-remove-${product.name}`}/>
          <ProductDialog onUpdate={this.updateByDialog} product={ product }>
            <RaisedButton label="Update" primary={true}
                          className={`e2e-update-${product.name}`}/>
          </ProductDialog>
        </CardActions>
    }
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
        {cardActions}
        <ProgressBar show={this.state.updating }/>
      </Card>
    );
  }
}
