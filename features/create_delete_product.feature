@CreateDeleteProduct
Feature:  As a user, I want to delete product entries from my product
catalogue database, so that I can safely purge products from the system.

  Scenario: delete valid product
    Given that I want to create product
    When click add button and set name "nightwatch" and click ok
    Then I see message, that product was created
    Then I see new product "nightwatch"
    Then message disappears
    When I click remove "nightwatch" product
    Then I see message, that product was removed
    Then I see that product "nightwatch" is not displayed anymore
