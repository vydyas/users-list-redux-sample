require('normalize.css/normalize.css');
require('./AppComponent.styl');

import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import  greenMuiTheme from './greenMuiTheme'
import  ProductCardsList from '../ProductCard/ProductCardsList'

export default ()=>
  <MuiThemeProvider muiTheme={greenMuiTheme}>
    <div>
      <AppBar title="Products Catalogue" showMenuIconButton={false}/>
      <div className="products-catalogue-container">
        <h3>Hi! Here is you products list.</h3>
        <ProductCardsList/>
      </div>
    </div>
  </MuiThemeProvider>
