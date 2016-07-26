import React from 'react';
import  ProductCard from './ProductCard'
import axios from 'axios';

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
    // this.state = { products: props.products };
    this.loadProducts();
  }

  loadProducts = () => {
    return axios.get(getApiUrl()).then((function ( response ) {
      response.data.forEach(function ( d ) {d._id = d._id.$oid;});
      this.setState({ products: response.data });
    }).bind(this));
  };

  addProduct = () => {
    axios.post(getApiUrl(), {
      name: Math.random(),
      value: Math.random()
    }).then(this.loadProducts);
  };

  removeProduct( product ) {
    axios.delete(getApiUrl(product._id), {
      name: Math.random(),
      value: Math.random()
    }).then(this.loadProducts);
  }

  render() {
    var products = this.state.products;

    return (
      <div onClick={ this.loadProducts }>
        <button onClick={ this.loadProducts}>refresh</button>
        <button onClick={ this.addProduct}>add</button>
        {products.map(( product ) =>
          <ProductCard key={product._id} card={product} remove={this.removeProduct.bind(this)}/>
        )}
      </div>
    );
  }
}
