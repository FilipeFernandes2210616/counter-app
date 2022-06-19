Feature: Input value for a item
    Value must increment times the number of items added

Scenario: Value is not set
    Given there is no number in value textbox
    And I don't insert number
    When I select button added
    Then item count should not increase

Scenario: Value is not number
    Given there is value in name textbox
    And I value is not number
    When I select button added
    Then item count should not increase and warning showld appar

Scenario: Number of items is decremented
    Given there is value in textbox
    And item is already counted in shopping cart
    When I press minus button
    Then value should decrese by number of times button pressed * initial value

Scenario: Item deleted
     Given there is value in name textbox
     When I press delete button
     Then value textbox should be deleted

