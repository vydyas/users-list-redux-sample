import React from 'react';
import  ProductCard from './ProductCard'
import axios from 'axios';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
    return axios.get(getApiUrl()).then((function ( response ) {
      response.data.forEach(function ( d ) {d.id = d._id.$oid;});
      this.setState({ products: response.data });
    }).bind(this));
  };

  add = () => {
    return axios.post(getApiUrl(), {
      name: Math.random(),
      value: Math.random()
    }).then(this.getList);
  };

  remove( product ) {
    return axios.delete(getApiUrl(product.id)).then(this.getList);
  }

  update( product ) {
    console.log(product)
    return axios.put(getApiUrl(product.id), {
      name: product.name,
      value: product.value
    }).then(this.getList);
  }

  render() {
    var products = this.state.products;

    return (
      <div onClick={ this.getList }>
        <FloatingActionButton
          title="Add new product"
          onClick={ this.add } mini={true}
          style={{float: 'right', marginTop: '-53px'}}>
          <ContentAdd />
        </FloatingActionButton>
        {products.map(( product ) =>
          <ProductCard key={product.id} card={product}
                       onRemove={this.remove.bind(this)}
                       onUpdate={this.update.bind(this)}/>
        )}
      </div>
    );
  }
}
