module.exports = {
  'remove product': function ( client ) {
    var randomSuffix = 'nightwatch' + Date.now();
    var AJAX_DELAY = 3000;
      client.url('http://localhost:8000/')
      .click('.e2e-add-product')
      .clearValue('.e2e-name-input')
      .setValue('.e2e-name-input', randomSuffix)
      .click('.e2e-ok-button')
      .waitForElementVisible('.e2e-message', AJAX_DELAY)
      .assert.elementPresent('.e2e-remove-' + randomSuffix)
      .waitForElementNotVisible('.e2e-message', 2500)
      .click('.e2e-remove-' + randomSuffix)
      .waitForElementVisible('.e2e-message', AJAX_DELAY)
      .assert.elementNotPresent('.e2e-remove-' + randomSuffix)
      .end();
  }
};
