describe("clicking on signup", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId(/signup/).click();
  });

  it("should go to the signup page", () => {
    cy.url().should("include", "/signup");
  });

  it("should render email, password and re-enter password inputs", () => {
    cy.findByLabelText(/email/i).should("exist");
    cy.findByLabelText(/password/i).should("exist");
    cy.findByPlaceholderText(/Re-enter Password/i).should("exist");
  });
});
