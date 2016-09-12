import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { ProductListStore, ProductListConstants } from '../flux/ProductListStore';

export default class extends React.Component {
  state = { tooltipMessage: false }

  constructor( props ) {
    super(props);
    ProductListStore.on(ProductListConstants.PRODUCT_ADDED, ( e, product )=> {
      this.setState({ tooltipMessage: `Product "${product.name}" added!'` });
    }).on(ProductListConstants.PRODUCT_REMOVED, ( product )=> {
      this.setState({ tooltipMessage: `Removed product "${product.name}"!` });
    }).on(ProductListConstants.PRODUCT_UPDATED, ( e, product )=> {
      this.setState({ tooltipMessage: `Product updated to "${product.name}"!` });
    });
  }

  handleRequestClose = () => {this.setState({ tooltipMessage: false });};

  render() {
    return <Snackbar
      open={!!this.state.tooltipMessage}
      message={this.state.tooltipMessage}
      autoHideDuration={1500}
      className="e2e-message"
      onRequestClose={this.handleRequestClose}/>
  }
}

