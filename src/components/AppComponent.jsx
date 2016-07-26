require('normalize.css/normalize.css');
require('components/AppComponent.styl');
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import  greenMuiTheme from 'components/greenMuiTheme'
import AppBar from 'material-ui/AppBar';

import  ProductCardsList from './ProductCard/ProductCardsList'
import  productsStub from './productsStub'

export default class extends React.Component {
  render() {
    var products = productsStub;
    return (
      <MuiThemeProvider muiTheme={greenMuiTheme}>
        <div>
          <AppBar title="Product Catalogue" showMenuIconButton={false}/>
          <div className="products-catalogue-container">
            <h3>Hi! Here is you products list.</h3>
            <ProductCardsList products={ products }/>
            <RaisedButton label="Defatt" primary={true}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
