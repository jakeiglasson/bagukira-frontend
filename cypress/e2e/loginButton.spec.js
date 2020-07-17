describe("clicking on login", () => {
  it("should go to the login page", () => {
    cy.visit("/");
    cy.findByText(/LOGIN/).click();
    cy.url().should("include", "/login");
  });
});
