import React from 'react';
import ProductCard from './ProductCard'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ProductDialog from './ProductDialog';
import NotificationBar from './NotificationBar';

import { ProductListActions } from '../flux/ProductsListActions';
import { ProductListStore } from '../flux/ProductListStore';
export default class extends React.Component {
  state = { products: [] }

  constructor( props ) {
    super(props);
    ProductListStore.addProductFetchedListener(()=> {
      this.setState({ products: ProductListStore.getProducts() })
    });
    ProductListActions.getList();
  }

  render() {
    var products = this.state.products;

    return (
      <div>
        <NotificationBar/>
        <ProductDialog label="Create" onUpdate={ProductListActions.addProduct}
                       product={ { name: 'product x', value: 'product y' } } open={true}>
          <FloatingActionButton
            className="e2e-add-product"
            title="Add new product"
            mini={true}
            style={{ float: 'right', marginTop: '-53px' }}>
            <ContentAdd />
          </FloatingActionButton>
        </ProductDialog>
        {products.map(( product ) =>
          <ProductCard key={product._id.$oid} card={product}
                       onRemove={ProductListActions.removeProduct}
                       onUpdate={ProductListActions.updateProduct}/>
        )}
      </div>
    );
  }
}
