import EventEmitter from './EventEmitter';
import axios from 'axios';
function getApiUrl( id ) {
  const apiKey = 'PGjxbP3NQzS2xXIe8PgSbJBxVzaPlXGe';
  const db = 'products-catalogue';
  const collection = 'products';
  return `https://api.mongolab.com/api/1/databases/${db}/collections/${collection}${id ? '/' + id : ''}?apiKey=${apiKey}`;
}

export let ProductListConstants = {
  GET_LIST: 'GET_LIST',
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  PRODUCT_LIST_FETCHED: 'PRODUCT_LIST_FETCHED',
  PRODUCT_ADDED: 'PRODUCT_ADDED',
  PRODUCT_REMOVED: 'PRODUCT_REMOVED',
  PRODUCT_UPDATED: 'PRODUCT_UPDATED'
}

export let ProductListStore = new EventEmitter();

ProductListStore.addProductFetchedListener = function ( listener ) {
  this.on(ProductListConstants.PRODUCT_LIST_FETCHED, listener);
};

ProductListStore.fetchList = function () {
  return axios.get(getApiUrl()).then(( products )=> {
    this.products = products.data;
    this.emit(ProductListConstants.PRODUCT_LIST_FETCHED);
  });
}

ProductListStore.addProduct = function ( product ) {
  return axios.post(getApiUrl(), {
    name: product.name,
    value: product.value
  }).then(()=> {
    return ProductListStore.fetchList();
  }).then(()=> {
    this.emit(ProductListConstants.PRODUCT_ADDED, product)
  });
}

ProductListStore.updateProduct = function ( product ) {
  return axios.put(getApiUrl(product._id.$oid), {
    name: product.name,
    value: product.value
  }).then(()=> {
    this.emit(ProductListConstants.PRODUCT_UPDATED, product)
  });
}

ProductListStore.removeProduct = function ( product ) {
  return axios.delete(getApiUrl(product._id.$oid)).then(()=> {
    return ProductListStore.fetchList();
  }).then(()=> {
    this.emit(ProductListConstants.PRODUCT_REMOVED, product)
  })
}

ProductListStore.getProducts = function () {
  return this.products;
};
