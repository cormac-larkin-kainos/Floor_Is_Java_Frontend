Feature: View All Jobs

    Scenario: Clicking "View All Jobs" button
        Given I am on the home page
        When I click the "View All Jobs" button
        Then the job list page should load
