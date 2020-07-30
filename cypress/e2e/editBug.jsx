const jwtToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTYxMTkyMjAsInN1YiI6MX0.yBXYRDzQ1nTN9l2Eea8Ygx0GdeX3chb8pxjIhFyUJ3E";
const email = "jake@gmail.com";

describe("Clicking on bug subject in bug list", () => {
  beforeEach(() => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("email", email);
    localStorage.setItem("userId", 1);
  });

  it("should lead to bugEdit view", () => {
    cy.visit(
      "/projects/p/dde75f66995e2cd738e8d7b98b1f3d1ee3e0b275d43d6f82f1a229def87fc025/bugs"
    );
    cy.findByTestId("bugId1").click();
    cy.url().should("include", "/bugs/b/");
  });
});
