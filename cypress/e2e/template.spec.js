describe("what operation is occuring", () => {
  it("what that operation does", () => {
    cy.visit("/");
    cy.findByText(/SIGNUP/).click();
    cy.url().should("include", "/signup");
  });
});
