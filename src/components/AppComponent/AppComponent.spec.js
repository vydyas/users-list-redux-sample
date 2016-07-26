// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from '../../../test-resources/shallowRender.helper';
import AppComponent from './AppComponent';

describe('AppComponent', () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = createComponent(Main);
  });

  it('should have its component name as default className', () => {
    expect(AppComponent.props.className).not.toBe('index');
  });
});
