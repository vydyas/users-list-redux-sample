require('babel-polyfill');
require('core-js/fn/object/assign');

const testsContext = require.context('../src', true, /(spec\.js$)/);
testsContext.keys().forEach(testsContext);
