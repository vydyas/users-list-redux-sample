module.exports = function () {
  var randomSuffix = Date.now();
  var AJAX_DELAY = 3000;
  this.Given(/^that I want to create product/, function () {
    this.url('http://localhost:8000').waitForElementVisible('body', 1000);
  });

  this.When(/^click add button and set name "([^"]*)" and click ok$/, function ( productName ) {
    this
      .click('.e2e-add-product')
      .clearValue('.e2e-name-input')
      .setValue('.e2e-name-input', productName + randomSuffix)
      .click('.e2e-ok-button')
  });

  this.When(/^I click remove "([^"]*)" product$/, function ( productName ) {
    this.click('.e2e-remove-' + productName + randomSuffix)
  });

  this.Then(/^I see message.*$/, function () {
    this.waitForElementVisible('.e2e-message', AJAX_DELAY);
  });

  this.Then(/^message disappears*$/, function () {
    this.waitForElementNotVisible('.e2e-message', 2000)
  });

  this.Then(/^I see new product "([^"]*)"$/, function ( productName ) {
    this.pause(1000).assert.elementPresent('.e2e-remove-' + productName + randomSuffix);
  });

  this.Then(/^I see that product "([^"]*)" is not displayed anymore$/, function ( productName ) {
    this.assert.elementNotPresent('.e2e-remove-' + productName + randomSuffix);
  });
};
