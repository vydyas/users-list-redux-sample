@CreateUpdateDeleteProduct
Feature:  As a user, I want to be able to create, update and delete products.
#please note that product name should contain letters or "-" sign

  Scenario: delete valid product
    Given that I want to create product

    When click add button
    When I set name "nightwatch0" and click "ok"
    Then I see message, that product was created
    Then I see new product "nightwatch0"
    Then message disappears

    When I click update "nightwatch0" product
    When I set name "nightwatch1" and click "ok"
    Then I see message, that product updated
    Then I see that product "nightwatch0" is not displayed anymore
    Then I see same product but renamed to "nightwatch1"
    Then message disappears

    When click add button
    When I set name "nightwatch2" and click "ok"
    Then I see message, that product was created
    Then I see new product "nightwatch2"
    Then message disappears

    When I click remove "nightwatch1" product
    Then I see message, that product was removed
    Then I see that product "nightwatch1" is not displayed anymore
    Then message disappears

    When I click remove "nightwatch2" product
    Then I see message, that product was removed
    Then I see that product "nightwatch2" is not displayed anymore
    Then message disappears
