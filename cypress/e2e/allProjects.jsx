const jwtToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTYxMTkyMjAsInN1YiI6MX0.yBXYRDzQ1nTN9l2Eea8Ygx0GdeX3chb8pxjIhFyUJ3E";
const email = "jake@gmail.com";

describe("All Projects view (static): Clicking on signout", () => {
  beforeEach(() => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", 1);
  });

  it("should lead to login page", () => {
    cy.visit("/projects");
    cy.findByText(/SIGN OUT/).click();
    cy.url().should("include", "/");
  });
});

describe("All Projects view (static): Clicking on new projects", () => {
  beforeEach(() => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", 1);
  });
  it("should lead to new project view", () => {
    cy.visit("/projects");
    cy.findByText(/NEW PROJECT/).click();
    cy.url().should("include", "/new");
  });
});

describe("All Projects view (static): Clicking on existing projects", () => {
  beforeEach(() => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", 1);
  });
  it("should lead to bug list view", () => {
    cy.visit("/projects");
    cy.findByTestId("EXISTING PROJECT1").click();
    cy.url().should("include", "/bugs");
  });
});

describe("All Projects view (static): Clicking on new project", () => {
  beforeEach(() => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", 1);
  });
  it("should lead to new project view", () => {
    cy.visit("/projects");
    cy.findByTestId("NEW PROJECT").click();
    cy.url().should("include", "/new");
  });
});

// should display navbar with welcome message and signout button. Should display 'new project' button and 'existing project' button
