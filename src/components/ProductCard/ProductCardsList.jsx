import React from 'react';
import  ProductCard from './ProductCard'

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.props.products.map(( card ) =>
          <ProductCard key={card._id} card={card}/>
        )}
      </div>
    );
  }
}
