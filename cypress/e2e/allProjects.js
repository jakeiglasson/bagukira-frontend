describe("All Projects view (static): Clicking on signout", () => {
  it("should lead to login page", () => {
    cy.visit("/projects");
    cy.findByText(/SIGN OUT/).click();
    cy.url().should("include", "/");
  });
});

describe("All Projects view (static): Clicking on new projects", () => {
  it("should lead to new project view", () => {
    cy.visit("/projects");
    cy.findByText(/NEW PROJECT/).click();
    cy.url().should("include", "/new");
  });
});

describe("All Projects view (static): Clicking on existing projects", () => {
  it("should lead to bug list view", () => {
    cy.visit("/projects");
    cy.findByText(/EXISTING PROJECT/).click();
    cy.url().should("include", "/p/1/bug-list");
  });
});

// should display navbar with welcome message and signout button. Should display 'new project' button and 'existing project' button
