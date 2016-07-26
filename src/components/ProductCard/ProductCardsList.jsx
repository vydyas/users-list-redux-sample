import React from 'react';
import  ProductCard from './ProductCard'
import axios from 'axios';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UpdateProductDialog from './UpdateProductDialog';

function getApiUrl( id ) {
  return 'https://api.mongolab.com/api/1/databases/products-catalogue/' +
    'collections/products' +
    (id ? '/' + id : '') +
    '?apiKey=PGjxbP3NQzS2xXIe8PgSbJBxVzaPlXGe';
}

export default class extends React.Component {
  constructor( props ) {
    super(props);
    this.state = { products: [] };
    this.getList();
  }

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
    }).then(this.getList);
  };

  remove = ( product ) => {
    return axios.delete(getApiUrl(product.id)).then(this.getList);
  };

  update = ( product ) => {
    return axios.put(getApiUrl(product.id), {
      name: product.name,
      value: product.value
    }).then(this.getList);
  };

  render() {
    var products = this.state.products;

    return (
      <div>
        <UpdateProductDialog label="Create" onUpdate={this.add} product={ {name: 'product x', value: 'product y'} }>
          <FloatingActionButton
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
