import Dispatcher from './Dispatcher';
import {ProductListStore, ProductListConstants} from './ProductListStore';

export let ProductListActions = {
  getList: function () {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.GET_LIST });
  },
  addProduct: function (product) {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.ADD_PRODUCT, product: product });
  },
  removeProduct: function (product) {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.REMOVE_PRODUCT,  product: product });
  },
  updateProduct: function (product) {
    return ProductListDispatcher.dispatch({ actionType: ProductListConstants.UPDATE_PRODUCT,  product: product });
  }
}

export let ProductListDispatcher = new Dispatcher();
ProductListDispatcher.register(function ( action ) {
  switch ( action.actionType ) {
    case ProductListConstants.GET_LIST: {
      ProductListStore.fetchList();
      break;
    }
    case ProductListConstants.ADD_PRODUCT: {
      ProductListStore.addProduct(action.product);
      break;
    }
    case ProductListConstants.REMOVE_PRODUCT: {
      ProductListStore.removeProduct(action.product);
      break;
    }
    case ProductListConstants.UPDATE_PRODUCT: {
      ProductListStore.updateProduct(action.product);
      break;
    }
  }
});
