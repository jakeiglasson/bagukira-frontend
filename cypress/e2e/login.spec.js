describe("clicking on login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByTestId(/login/).click();
  });

  it("should go to the login page", () => {
    cy.url().should("include", "/login");
  });

  it("should render email and password inputs", () => {
    cy.findByLabelText(/email/i).should("exist");
    cy.findByLabelText(/password/i).should("exist");
  });
});

describe("with the correct login credentials user", () => {
  before(() => {
    cy.fixture("user.json").then((user) => {
      cy.visit("/login");
      cy.findByLabelText(/email/i).type(user.email);
      cy.findByLabelText(/password/i).type(user.password);
    });
  });

  it("should be able to click on submit and be navigated to /projects", () => {
    cy.get("form").submit();
    cy.url().should("eql", "http://localhost:3000/projects");
  });

  after(() => {
    // we need to clean up after we run the tests
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("auth");
  });
});
