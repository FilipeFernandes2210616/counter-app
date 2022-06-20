Feature: Input name for item in shopping cart
    As a user I want too input text so that I can see it in shopping cart
    Name must be set before adding item to shopping cart
    If name is not set item can not be added to shopping cart

Scenario: Name is set and item already counted
    Given there is text in name textbox
    And item is already counted in shopping cart
    When I try change name of item
    Then name should not change

Scenario: Item deleted
     Given there is text in name textbox
     When I press delete button
     Then textbox should be deleted