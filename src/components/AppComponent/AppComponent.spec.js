import createComponent from '../../../test-resources/shallowRender.helper';
import AppComponent from './AppComponent';

describe('AppComponent', () => {
  let appComponent;

  beforeEach(() => {
    // yes I'm not mocking http call, sorry for this
    appComponent = createComponent(AppComponent);
  });

  it('should create a component', () => {
    expect(appComponent).toBeTruthy();
  });
});

