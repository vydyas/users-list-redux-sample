import Dispatcher from './Dispatcher';
import { ProductListStore, ProductListConstants } from './ProductListStore';

export let ProductListActions = {
  getList: function () {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.GET_LIST });
  },
  addProduct: function ( product ) {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.ADD_PRODUCT, product: product });
  },
  removeProduct: function ( product ) {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.REMOVE_PRODUCT, product: product });
  },
  updateProduct: function ( product ) {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.UPDATE_PRODUCT, product: product });
  }
}

export let ProductListDispatcher = new Dispatcher();
var actionsMap = {
  [ProductListConstants.GET_LIST]: ()=> ProductListStore.fetchList(),
  [ProductListConstants.ADD_PRODUCT]: ( action )=> ProductListStore.addProduct(action.product),
  [ProductListConstants.REMOVE_PRODUCT]: ( action )=> ProductListStore.removeProduct(action.product),
  [ProductListConstants.UPDATE_PRODUCT]: ( action )=> ProductListStore.updateProduct(action.product)
}
ProductListDispatcher.register(function ( action ) {
  if ( actionsMap[ action.actionType ] ) {
    actionsMap[ action.actionType ](action);
  }
});
