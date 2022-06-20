Feature: Input name for item in shopping cart
    As a user I want too input name so that I can see it in shopping cart
    Name must be set before adding item to shopping cart
    If name is not set item can not be added to shopping cart

Background:
    Given there is no text in name textbox  


Scenario: Name is not set 
    And I don't insert name
    When I select button added
    Then item count should not increase

Scenario Outline: Name is set
    And I insert +name- 
    When I select button added
    Then item count should increase
    And the +name- should appear

Examples:
| Name |
| Chocolate |
| 12 |
    

