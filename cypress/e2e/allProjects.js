describe("Projects view (static): Clicking on signout", () => {
  it("should lead to login page", () => {
    cy.visit("/projects");
    cy.findByText(/SIGN OUT/).click();
    cy.url().should("include", "/");
  });
});

// should display navbar with welcome message and signout button. Should display 'new project' button and 'existing project' button
