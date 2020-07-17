describe("clicking on signup", () => {
  it("should go to the signup page", () => {
    cy.visit("/");
    cy.findByText(/SIGNUP/).click();
    cy.url().should("include", "/signup");
  });
});
