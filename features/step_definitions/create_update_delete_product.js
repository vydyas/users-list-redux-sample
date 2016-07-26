module.exports = function () {
  var randomSuffix = '-' + Date.now();
  var AJAX_FAILURE_TIMEOUT = 10000;
  this.Given(/^that I want to create product/, function () {
    this.url('http://localhost:8000').waitForElementVisible('body', 1000);
  });

  this.When(/^click add button$/, function () { this.click('.e2e-add-product'); });

  this.When(/^I set name "([^"]*)" and click "ok"$/, function ( productName ) {
    this
      .clearValue('.e2e-name-input')
      .setValue('.e2e-name-input', productName + randomSuffix)
      .click('.e2e-ok-button');
  });

  this.When(/^I click remove "([^"]*)" product$/, function ( productName ) {
    this.click('.e2e-remove-' + productName + randomSuffix);
  });

  this.When(/^I click update "([^"]*)" product$/, function ( productName ) {
    this.click('.e2e-update-' + productName + randomSuffix)
  });

  this.Then(/^I see message.*$/, function () {
    this.waitForElementVisible('.e2e-message', AJAX_FAILURE_TIMEOUT);
  });

  this.Then(/^message disappears*$/, function () {
    this.waitForElementNotVisible('.e2e-message', 2500);
  });

  this.Then(/^I see .+ product.*"([^"]*)"$/, function ( productName ) {
    this.assert.elementPresent('.e2e-remove-' + productName + randomSuffix);
  });

  this.Then(/^I see that product "([^"]*)" is not displayed anymore$/, function ( productName ) {
    this.assert.elementNotPresent('.e2e-remove-' + productName + randomSuffix);
  });
};
