const jwtToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTYxMTkyMjAsInN1YiI6MX0.yBXYRDzQ1nTN9l2Eea8Ygx0GdeX3chb8pxjIhFyUJ3E";
const email = "jake@gmail.com";

describe("Clicking on edit Project", () => {
  beforeEach(() => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", 1);
    localStorage.setItem("projectOwnerId", 1);
  });

  it("should lead to edit project view", () => {
    cy.visit(
      "/projects/p/dde75f66995e2cd738e8d7b98b1f3d1ee3e0b275d43d6f82f1a229def87fc025"
    );

    // cy.findByTestId("mToggle").click();
    cy.findByTestId("linkTestEDIT PROJECT").click();

    cy.url().should("include", "/edit");
  });
});
