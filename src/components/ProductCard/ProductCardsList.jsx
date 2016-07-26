import React from 'react';
import  ProductCard from './ProductCard'
import axios from 'axios';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UpdateProductDialog from './UpdateProductDialog';
import Snackbar from 'material-ui/Snackbar';

function getApiUrl( id ) {
  return 'https://api.mongolab.com/api/1/databases/products-catalogue/' +
    'collections/products' +
    (id ? '/' + id : '') +
    '?apiKey=PGjxbP3NQzS2xXIe8PgSbJBxVzaPlXGe';
}

export default class extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { products: [], tooltipMessage: false };
    this.getList();
  }

  handleRequestClose = () => {this.setState({ tooltipMessage: false });};

  getList = () => {
    return axios.get(getApiUrl()).then(( response ) => {
      response.data.forEach(function ( d ) {d.id = d._id.$oid;});
      this.setState({ products: response.data });
    });
  };

  add = ( product ) => {
    return axios.post(getApiUrl(), {
      name: product.name,
      value: product.value
    }).then(this.getList).then(()=> {
      this.setState({ tooltipMessage: 'Product "' + product.name + '" added!' });
    });
  };

  remove = ( product ) => {
    return axios.delete(getApiUrl(product.id)).then(this.getList).then(()=> {
      this.setState({ tooltipMessage: 'Product "' + product.name +'" removed!' });
    });
  };

  update = ( product ) => {
    return axios.put(getApiUrl(product.id), {
      name: product.name,
      value: product.value
    }).then(()=>{
      this.setState({ tooltipMessage: 'Product updated to"' + product.name + '"!' });
    }).then(this.getList);
  };

  render() {
    var products = this.state.products;

    return (
      <div>
        <Snackbar
          open={!!this.state.tooltipMessage}
          message={this.state.tooltipMessage}
          autoHideDuration={1500}
          className="e2e-message"
          onRequestClose={this.handleRequestClose}
        />
        <UpdateProductDialog label="Create" onUpdate={this.add} product={ {name: 'product x', value: 'product y'} }>
          <FloatingActionButton
            className="e2e-add-product"
            title="Add new product"
            mini={true}
            style={{float: 'right', marginTop: '-53px'}}>
            <ContentAdd />
          </FloatingActionButton>
        </UpdateProductDialog>
        {products.map(( product ) =>
          <ProductCard key={product.id} card={product}
                       onRemove={this.remove}
                       onUpdate={this.update}/>
        )}
      </div>
    );
  }
}
